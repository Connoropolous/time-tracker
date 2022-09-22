import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PROCESS } from '../graphql/queries'
import { SlButton, SlCard, SlInput } from '@shoelace-style/shoelace/dist/react'
// @ts-ignore
import * as randomcolor from 'randomcolor'
import { useNavigate } from 'react-router-dom'

export type CreateCategoryProps = {
  myAgentId: string
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ myAgentId }) => {
  const navigate = useNavigate()

  const [createProcess, createProcessMutationStatus] =
    useMutation(CREATE_PROCESS)

  const [image, setImage] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [color, setColor] = useState(randomcolor())

  if (createProcessMutationStatus.loading)
    return <div>Creating category...</div>
  if (createProcessMutationStatus.error) return <p>ERROR during creation</p>

  const create = async () => {
    await createProcess({
      variables: {
        process: {
          classifiedAs: color,
          name: categoryName,
          note: image,
        },
      },
    })
    navigate('/categories')
    window.location.reload()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (categoryName && image) {
      create()
    }
  }

  return (
    <SlCard className='create-form'>
      <form onSubmit={handleSubmit}>
        <br />
        <SlInput
          required
          label='Category Name'
          // @ts-ignore
          onSlChange={(e) => setCategoryName(e.target.value)}
          value={categoryName}
        />
        <br />

        {/* Color */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
          <SlInput
            required
            label='Color'
            // @ts-ignore
            onSlChange={(e) => setColor(e.target.value)}
            value={color}
          />
          <div
            style={{
              marginLeft: '10px',
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: color,
            }}
          />
        </div>
        <br />

        {/* Image */}
        <SlInput
          required
          label='Image'
          // @ts-ignore
          onSlChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <br />
        <SlButton type='submit' variant='primary'>
          Create
        </SlButton>
      </form>
    </SlCard>
  )
}

export default CreateCategory
