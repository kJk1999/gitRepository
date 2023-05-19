import {Component} from 'react'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeFilter: languageFiltersData[0].id,
    status: statusConstants.inprogress,
  }

  componentDidMount() {
    const {id} = this.state
    this.onClickFilterItem(id)
  }

  onClickFilterItem = async id => {
    this.setState({status: statusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${id}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        repositoryList: updatedData,
        activeFilter: id,

        status: statusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({status: statusConstants.failure})
    }
  }

  render() {
    const {repositoryList, activeFilter, status} = this.state
    console.log(activeFilter)

    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              key={eachData.id}
              eachData={eachData}
              onClickFilterItem={this.onClickFilterItem}
              activeFilter={activeFilter}
              isActive={activeFilter === eachData.id}
            />
          ))}
        </ul>
        <ul className="repo-list-container">
          {repositoryList.map(eachList => (
            <RepositoryItem
              key={eachList.id}
              eachList={eachList}
              status={status}
              apiConstants={statusConstants}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
