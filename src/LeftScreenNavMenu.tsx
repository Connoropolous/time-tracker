import { SlIcon, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react'
import React from 'react'
import { Link } from 'react-router-dom'

export type LeftScreenNavMenuProps = {}

const LeftScreenNavMenu: React.FC<LeftScreenNavMenuProps> = ({}) => {
  return (
    <div className='left-screen-nav-menu'>
      <SlMenu>
        <Link to='/logging' className='no-link-underline'>
          <SlMenuItem value='Logs'>
            <SlIcon slot='prefix' name='minecart-loaded' />
            Logging
          </SlMenuItem>
        </Link>
        <Link to='/categories' className='no-link-underline'>
          <SlMenuItem value='Logs'>
            <SlIcon slot='prefix' name='minecart-loaded' />
            Categories
          </SlMenuItem>
        </Link>
        {/* <Link to='/reports' className='no-link-underline'>
          <SlMenuItem value='Reports'>
            Reports
            <SlIcon slot='prefix' name='calendar-event' />
          </SlMenuItem>
        </Link> */}
      </SlMenu>
    </div>
  )
}

export default LeftScreenNavMenu
