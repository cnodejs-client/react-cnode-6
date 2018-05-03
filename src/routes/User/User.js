import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Exception from 'components/Exception';
import { getUserData } from './UserRedux';
import { UserInfo, UserTopics } from './components';
import styles from './User.scss';

const cls = classNames(styles.mdContainer);

@connect(
  state => ({
    loading: state.user.loading,
    userData: state.user.userData,
    error: state.user.error,
  }),
  dispatch => ({
    getUserData: bindActionCreators(getUserData, dispatch),
  }),
)
class User extends React.Component {
  componentDidMount() {
    const { match: { params: { name } } } = this.props;
    this.props.getUserData(name);
  }

  render() {
    const { loading, userData, error } = this.props;
    return (
      <React.Fragment>
        {
          (!error) ? (
            <div className={cls}>
              <UserInfo
                loading={loading}
                user={userData}
              />
              {
                !loading && (
                  <UserTopics
                    dataList={{
                      topics: userData.recent_topics || [],
                      replies: userData.recent_replies || [],
                      collect: userData.collect || [],
                    }}
                  />
                )
              }
            </div>
          ) : (
            <Exception />
          )
        }
      </React.Fragment>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,

  loading: PropTypes.bool,
  userData: PropTypes.object,
  error: PropTypes.bool,
  getUserData: PropTypes.func,
};

export default User;
