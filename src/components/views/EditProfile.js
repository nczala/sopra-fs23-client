import React from 'react'
import PropTypes from 'prop-types'

const EditProfile = props => {


    return (
        <div>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </div>
    )
}

EditProfile.propTypes = {

}

export default EditProfile
