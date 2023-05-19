// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachData, onClickFilterItem, isActive} = props
  const {id, language} = eachData
  const isItemActive = isActive ? 'style-active' : ''

  function onClickListItem() {
    onClickFilterItem(id)
  }
  return (
    <li className="list-item">
      <button
        type="button"
        className={`button ${isItemActive}`}
        onClick={onClickListItem}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
