import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { SlButton } from '@shoelace-style/shoelace/dist/react'
import { Link, useLocation } from 'react-router-dom'
import LogsList from '../components/LogsList'
import MainPanelHeader from '../components/MainPanelHeader'
import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_COMMITMENT,
  CREATE_ECONOMIC_EVENT,
  DELETE_COMMITMENT,
  LIST_COMMITMENTS,
  LIST_ECONOMIC_EVENTS,
  LIST_PROCESSES_WITHOUT_LINKS,
} from '../graphql/queries'

export type EventsProps = {
  myAgentId: string
}

type ActiveTimer = {
  categoryId: string // process
  timerId: string // commitment
  timerRevisionId: string // commitment
  hasBeginning: string // ISO date
}

const Events: React.FC<EventsProps> = ({ myAgentId }) => {
  const location = useLocation()

  // running timer
  const runningTimers = useQuery(LIST_COMMITMENTS)
  const [createEE, createEEmutationStatus] = useMutation(CREATE_ECONOMIC_EVENT)
  const [createCommitment, createCommitmentMutationStatus] =
    useMutation(CREATE_COMMITMENT)
  const [deleteCommitment, deleteCommitmentMutationStatus] =
    useMutation(DELETE_COMMITMENT)

  // all categories
  const categories = useQuery(LIST_PROCESSES_WITHOUT_LINKS)

  // all logs
  const economicEvents = useQuery(LIST_ECONOMIC_EVENTS)

  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null)

  // looking for which category is actively being timed, if any
  useEffect(() => {
    let activeTimerFromCommitments: ActiveTimer | null = null // Nothing category
    if (runningTimers.data && categories.data) {
      for (let i = 0; i < categories.data.processes.edges.length; i++) {
        const category = categories.data.processes.edges[i]
        const foundCategoryInActiveTimers =
          runningTimers.data.commitments.edges.find((commitment: any) => {
            return commitment.node.inputOf.id === category.node.id
          })
        if (foundCategoryInActiveTimers) {
          activeTimerFromCommitments = {
            timerId: foundCategoryInActiveTimers.node.id,
            timerRevisionId: foundCategoryInActiveTimers.node.revisionId,
            hasBeginning: foundCategoryInActiveTimers.node.hasBeginning,
            categoryId: category.node.id,
          }
          break
        }
      }
    }
    setActiveTimer(activeTimerFromCommitments)
  }, [runningTimers.data, categories.data])

  useEffect(() => {
    economicEvents.refetch()
    categories.refetch()
    runningTimers.refetch()
  }, [location.pathname, economicEvents, categories, runningTimers])

  // console.log('test', runningTimers.data, categories.data)

  const baseData = [
    {
      color: '#10e1e3',
      name: 'Nothing',
      key: 'nothing',
    },
  ]
  const categoriesMapped = categories.data
    ? categories.data.processes.edges.map((category: any) => {
        return {
          color: category.node.classifiedAs
            ? category.node.classifiedAs[0]
            : '#BBBBBB',
          name: category.node.name,
          key: category.node.id,
        }
      })
    : []
  const data = baseData.concat(categoriesMapped)

  const chartData = data.map((category, index) => {
    let isActive = false
    if (
      (index === 0 && activeTimer === null) ||
      (activeTimer && category.key === activeTimer.categoryId)
    ) {
      isActive = true
    }
    return {
      title: category.name,
      value: 1, // each takes up even space
      // make more transparent, if not the active category
      // 32 = 20% opacity
      color: `${category.color}${isActive ? '' : '32'}`,
      key: category.key,
    }
  })

  const onClickCategory = async (key: string) => {
    // console.log('key', key)
    // return

    // if no active timer, and not clicking 'nothing'
    if (
      (!activeTimer && key === 'nothing') ||
      (activeTimer && activeTimer.categoryId === key)
    ) {
      // do nothing
      return
    }

    if (activeTimer && (key === 'nothing' || activeTimer.categoryId !== key)) {
      // stop the running timer
      const deleted = await deleteCommitment({
        variables: {
          revisionId: activeTimer.timerRevisionId,
        },
      })
      // log it as 'observed' to an actual economic event now
      const event = await createEE({
        variables: {
          event: {
            action: 'work',
            provider: myAgentId,
            receiver: myAgentId,
            effortQuantity: {
              hasNumericalValue: 1,
            },
            // note: desc,
            inputOf: activeTimer.categoryId,
            // required field
            resourceClassifiedAs: 'https://something',
            // formatted as ISO
            hasBeginning: activeTimer.hasBeginning,
            // the end is now
            hasEnd: new Date().toISOString(),
          },
        },
      })
      economicEvents.refetch()
    }

    if (
      key !== 'nothing' &&
      (!activeTimer || (activeTimer && activeTimer.categoryId !== key))
    ) {
      // start a new timer
      const commitment = await createCommitment({
        variables: {
          commitment: {
            action: 'work',
            provider: myAgentId,
            receiver: myAgentId,
            effortQuantity: {
              hasNumericalValue: 1,
            },
            // note: desc,
            inputOf: key,
            // required field
            resourceClassifiedAs: 'https://something',
            // formatted as ISO
            hasBeginning: new Date().toISOString(),
          },
        },
      })
      setActiveTimer({
        categoryId: key,
        timerId: commitment.data.createCommitment.commitment.id,
        timerRevisionId: commitment.data.createCommitment.commitment.revisionId,
        hasBeginning: commitment.data.createCommitment.commitment.hasBeginning,
      })
    }
    categories.refetch()

    if (key === 'nothing') {
      setActiveTimer(null)
    }
  }

  return (
    <>
      <MainPanelHeader>
        <h2>Logging</h2>
        <div>
          <Link to='/logging/new'>
            <SlButton variant='primary'>Add a Log</SlButton>
          </Link>
        </div>
      </MainPanelHeader>
      <div className='active-time-entry-chart'>
        <PieChart
          labelStyle={{ fontSize: '0.5rem' }}
          label={({ dataEntry }) => dataEntry.title}
          data={chartData}
          onClick={(e, i: any) => {
            const categoryId = chartData[i].key
            onClickCategory(categoryId)
          }}
        />
      </div>
      <LogsList queryResults={economicEvents} myAgentId={myAgentId} />
    </>
  )
}

export default Events
