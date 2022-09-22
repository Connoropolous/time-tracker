import React, { useEffect } from 'react'
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react'
import { useQuery } from '@apollo/client'
import { LIST_PROCESSES } from '../graphql/queries'
import GeneralList from './GeneralList'
import { useLocation } from 'react-router-dom'

export type CategoryListProps = {
  myAgentId: string
}

const CategoryList: React.FC<CategoryListProps> = ({ myAgentId }) => {
  const location = useLocation()
  const categories = useQuery(LIST_PROCESSES)
  const { data, loading, error } = categories
  useEffect(() => {
    categories.refetch()
  }, [location.pathname, categories])

  if (loading) return <div>Listing categories...</div>
  if (error) return <p>ERROR</p>
  if (!data) return <p>Not found</p>

  const dataTable = (
    <>
      {/* Checkboxes */}
      <div className='data-table-column'>
        {/* Checkbox */}
        <div className='data-table-header'>
          <SlCheckbox disabled></SlCheckbox>
        </div>
        {data.processes.edges.map((process: any) => (
          <div className='data-table-cell'>
            <SlCheckbox disabled />
          </div>
        ))}
      </div>

      {/* Images */}
      <div className='data-table-column'>
        {/* Image */}
        <div className='data-table-header'></div>
        {data.processes.edges.map((process: any) => (
          <div className='data-table-cell'>
            <div
              style={{
                width: '40px',
                height: '40px',
                // HACK: note for image
                background: `url(${process.node.note})`,
                backgroundSize: 'contain',
              }}
            />
          </div>
        ))}
      </div>

      {/* Names */}
      <div className='data-table-column' style={{ flex: 2 }}>
        {/* Name */}
        <div className='data-table-header'>Name</div>
        {data.processes.edges.map((process: any) => (
          <div className='data-table-cell data-table-bold'>
            {process.node.name}
          </div>
        ))}
      </div>

      {/* Qunatity */}
      <div className='data-table-column' style={{ flex: 1 }}>
        <div className='data-table-header'># of logs</div>
        {data.processes.edges.map((process: any) => (
          <div className='data-table-cell'>
            {process.node.observedInputs.length}
          </div>
        ))}
      </div>
    </>
  )
  // {data.economicResources.edges.length === 0 && (
  // <div style={{ textAlign: "center", marginTop: "1rem" }}>
  // There are no resources yet. Use 'Add Resource' to add one.
  // </div>
  // )}
  return <GeneralList dataTable={dataTable} />
}

export default CategoryList
