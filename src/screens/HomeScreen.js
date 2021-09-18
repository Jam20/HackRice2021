import React from 'react'
import './screens.css'
import SideMenu from '../components/SideMenu'
const HomeScreen = () => {

    return (
        <>
         <div className='top-bar'>
            <text class="title-text">Lorem Ipsum</text>
            </div>
            <div className='container'>
                
                <div className='wrapper'>
                    <div className='left-section'>
                      <SideMenu/>
                    </div>
                    <div className="middle-right-section">

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeScreen