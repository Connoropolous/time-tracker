import React, { useEffect, useState } from 'react'
import '@shoelace-style/shoelace/dist/themes/light.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'

import graphqlClientHolochain from '@vf-ui/graphql-client-holochain'

import './App.css'
import Header from './Header'
import LeftScreenNavMenu from './LeftScreenNavMenu'
import MyAgent from './MyAgent'
import Projects from './routes/Categories'
import NewCategory from './routes/NewCategory'
import Logging from './routes/Logging'
import NewLog from './routes/NewLog'

setBasePath(
  'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/'
)

interface Props {}

const App: React.FC<Props> = () => {
  const [myAgent, setMyAgent] = useState<{ id: string; name: string }>()
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()

  const connect = async () => {
    try {
      const client = await graphqlClientHolochain()
      setClient(client)
    } catch (e) {
      console.error('error during graphqlClientHolochain', e)
    }
  }

  useEffect(() => {
    connect()
  }, [])

  if (!client) {
    return <div>Making websocket connection...</div>
  }

  const myAgentId = myAgent ? myAgent.id : ''
  const myAgentName = myAgent ? myAgent.name : ''

  return (
    <BrowserRouter>
      <div className='container'>
        <Header name={myAgentName} />
        <div className='below-header'>
          <LeftScreenNavMenu />

          <div className='main-panel'>
            <ApolloProvider client={client}>
              {!myAgent && <MyAgent setMyAgent={setMyAgent} />}
              <Routes>
                <Route
                  path='/logging'
                  element={<Logging myAgentId={myAgentId} />}
                />
                <Route
                  path='/logging/new'
                  element={<NewLog myAgentId={myAgentId} />}
                />
                <Route
                  path='/categories'
                  element={<Projects myAgentId={myAgentId} />}
                />
                <Route
                  path='/categories/new'
                  element={<NewCategory myAgentId={myAgentId} />}
                />
                {/* redirect */}
                <Route
                  path='/'
                  element={<>{myAgent && <Navigate to='/logging' />}</>}
                />
              </Routes>
            </ApolloProvider>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
