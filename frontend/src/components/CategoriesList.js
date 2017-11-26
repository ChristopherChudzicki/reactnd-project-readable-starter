import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const CategoriesList = (props) => {
  const {categories} = props

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.name}>
            <Link to={`/category/${cat.path}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
}

export default CategoriesList
