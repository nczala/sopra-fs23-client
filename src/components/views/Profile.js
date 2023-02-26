// import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

const Profile = props => {
    // const history = useHistory();
    const user = props.location.state.user;
    console.log(user)

    return (
      <BaseContainer>
        <div className="profile container">
            <ul className="profile property-list">
            {Object.entries(user)
                .filter(([_, val], index) => val !== undefined)
                .map(([key, val], index) => (
            <div key={index}>{key}: {val}</div>
          ))}
        </ul>
        </div>
      </BaseContainer>
    );
  };


Profile.propTypes = {
    user: PropTypes.object
};

export default Profile;