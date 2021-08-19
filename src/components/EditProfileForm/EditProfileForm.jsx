import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import styles from './EditProfileForm.module.css'
import * as profileService from '../../services/profileService'

class EditProfileForm extends Component {
  state = {
    name: '',
    email: '',
    avatar: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  handleSubmit = async e => {
    e.preventDefault()
    try {
      const updatedProfile = await profileService.update(this.props.userProfile._id, this.state)
      this.props.updateUserProfile(updatedProfile)
      this.props.history.push({
        pathname: '/profile',
        state: {profile: updatedProfile}
      })
    } catch (err) {
      console.log(err)
    }
  }

  isFormInvalid() {
    const { name, email } = this.state
    return !(name && email )
  }

  render() {
    const { name, email, avatar} = this.state
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div >
          <label htmlFor="name" >
            Name
          </label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={name}
            name="name"
            onChange={this.handleChange}
          />
        </div>
        <div >
          <label htmlFor="avatar" >
            Avatar Image
          </label>
          <input
            type="text"
            autoComplete="off"
            id="avatar"
            value={avatar}
            name="avatar"
            onChange={this.handleChange}
          />
        </div>
        <div >
          <label htmlFor="email" >Email</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div >
            <button disabled={this.isFormInvalid()} >SUBMIT</button>
          <Link to="/profile">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    )
  }
}

export default EditProfileForm