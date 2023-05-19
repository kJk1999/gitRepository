// Write your code here
import Loader from 'react-loader-spinner'
import './index.css'

const RepositoryItem = props => {
  const {eachList, status, apiConstants} = props
  const {avatarUrl, forkCount, starsCount, name, issuesCount} = eachList

  const renderSuccess = () => (
    <li className="list-item-card">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1>{name}</h1>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="fork"
        />
        <p>{forkCount} fork</p>
      </div>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issue"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )

  const renderLoadSpinner = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  const renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure"
      />
    </div>
  )

  switch (status) {
    case apiConstants.success:
      return renderSuccess()
    case apiConstants.failure:
      return renderFailure()
    case apiConstants.inProgress:
      return renderLoadSpinner()

    default:
      return null
  }
}
export default RepositoryItem
