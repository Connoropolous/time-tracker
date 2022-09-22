import { useMutation, useQuery } from '@apollo/client'
import {
  SlButton,
  SlCard,
  SlInput,
  SlMenuItem,
  SlSelect,
} from '@shoelace-style/shoelace/dist/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  CREATE_ECONOMIC_EVENT,
  LIST_ECONOMIC_RESOURCES,
  LIST_PROCESSES,
} from '../graphql/queries'
import CategoryList from './CategoryList'

export type ResourceTransferProps = {
  myAgentId: string
}

export type ProcessListProps = {
  processes: any[]
}
const ProcessList: React.FC<ProcessListProps> = ({ processes }) => {
  return (
    <>
      {processes.map((process: any) => {
        const value = process.node.id
        return (
          <SlMenuItem
            key={value}
            value={value}
            className='resource-select-menu-item'
          >
            {process.node.name}
            {/* color swatch */}
            <div slot='suffix'>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '15px',
                  backgroundColor: process.node.classifiedAs,
                }}
              />
            </div>
          </SlMenuItem>
        )
      })}
    </>
  )
}

const ResourceTransfer: React.FC<ResourceTransferProps> = ({ myAgentId }) => {
  const navigate = useNavigate()
  const [createEE, createEEmutationStatus] = useMutation(CREATE_ECONOMIC_EVENT)
  const processes = useQuery(LIST_PROCESSES)

  const [category, setCategory] = useState()
  const [quantity, setQuantity] = useState(10)
  const [desc, setDesc] = useState('')

  const today = new Date()
  const month = ('0' + (today.getUTCMonth() + 1)).slice(-2)
  const day = ('0' + today.getUTCDate()).slice(-2)
  const hours = ('0' + today.getUTCHours()).slice(-2)
  const minutes = ('0' + today.getUTCMinutes()).slice(-2)

  const [startDate, setStartDate] = useState(
    `${today.getUTCFullYear()}-${month}-${day}`
  )
  const [startTime, setStartTime] = useState(`${hours}:${minutes}`)

  const [endDate, setEndDate] = useState(
    `${today.getUTCFullYear()}-${month}-${day}`
  )
  const [endTime, setEndTime] = useState(`${hours}:${minutes}`)

  if (createEEmutationStatus.loading) return <div>Creating log...</div>
  if (createEEmutationStatus.error) return <p>ERROR</p>

  const create = async () => {
    await createEE({
      variables: {
        event: {
          action: 'work',
          provider: myAgentId,
          receiver: myAgentId,
          effortQuantity: {
            hasNumericalValue: quantity,
          },
          note: desc,
          inputOf: category,
          // required field
          resourceClassifiedAs: 'https://something',
          // formatted as ISO
          hasBeginning: `${startDate}T${startTime}:00.00Z`,
          hasEnd: `${endDate}T${endTime}:00.00Z`,
        },
      },
    })
    navigate('/logging')
    window.location.reload()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    create()
  }

  return (
    <>
      {/* The Form */}
      <SlCard className='create-form'>
        {processes.loading && <>Loading...</>}
        {!processes.loading && !processes.error && (
          <form onSubmit={handleSubmit}>
            <SlSelect
              // required
              label='Category*'
              onSlChange={(e) => {
                // @ts-ignore
                setCategory(e.target.value)
              }}
            >
              {processes.data.processes.edges && (
                <ProcessList processes={processes.data.processes.edges} />
              )}
            </SlSelect>
            <br />

            {/* Desc */}
            <SlInput
              type='text'
              label='Description'
              onSlChange={(e) => {
                // @ts-ignore
                setDesc(e.target.value)
              }}
              value={desc}
            />
            <br />

            {/* Start Date / Time */}
            <SlInput
              required
              type='date'
              label='Start Date'
              onSlChange={(e) => {
                // @ts-ignore
                setStartDate(e.target.value)
              }}
              value={startDate}
            />
            <br />
            <SlInput
              required
              type='time'
              label='Start Time (UTC)'
              onSlChange={(e) => {
                // @ts-ignore
                setStartTime(e.target.value)
              }}
              value={startTime}
            />

            {/* End Time */}
            <br />
            <SlInput
              required
              type='date'
              label='End Date'
              onSlChange={(e) => {
                // @ts-ignore
                setEndDate(e.target.value)
              }}
              value={endDate}
            />
            <br />
            <SlInput
              required
              type='time'
              label='End Time (UTC)'
              onSlChange={(e) => {
                // @ts-ignore
                setEndTime(e.target.value)
              }}
              value={endTime}
            />
            <br />
            <SlButton type='submit' variant='primary'>
              Create
            </SlButton>
          </form>
        )}
      </SlCard>
    </>
  )
}

export default ResourceTransfer
