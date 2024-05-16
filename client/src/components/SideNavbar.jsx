import React, { Component, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import SideBarDashboard from '../assets/images/side-bar-dashboard.png'
import SideBarMembers from '../assets/images/side-bar-members.png'
import SideBarQuizzes from '../assets/images/side-bar-quizzes.png'
import SideBarResults from '../assets/images/side-bar-results.png'

export default class SideNavbar extends Component {
  render() {
    const { role } = this.props;
    
    return (
      <div>
        <div className="dashboard__sidebar">
                        <div className="dashboard__sidebar__options">
                            <Link to="/" className='link'>
                              <div className="dashboard__sidebar__options__item">
                                  <img src={SideBarDashboard} alt=""/>
                                  <h3>Dashboard</h3>
                              </div>
                            </Link>
                            <Link to="/quizzes" className='link'>
                              <div className="dashboard__sidebar__options__item">
                                  <img src={SideBarQuizzes} alt=""/>
                                  <h3>Quizzes</h3>
                              </div>
                            </Link>
                            {
                              (role == 'admin') ?
                              <div>
                                <Link to='/members' className='link'>
                                  <div className="dashboard__sidebar__options__item">
                                      <img src={SideBarMembers} alt=""/>
                                      <h3>Members</h3>
                                  </div>
                                </Link>
                              </div>
                              :
                              null
                            }
                        </div>
                    </div>
      </div>
    )
  }
}