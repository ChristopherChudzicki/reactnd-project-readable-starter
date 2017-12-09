import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const CategoriesList = (props) => {
  const {categories} = props

  return (
    <nav>
      Categories:
      {categories.map(cat => (
        <Link
          key={cat.name}
          to={`/${cat.path}`}
          style={{padding:'4pt'}}
          >
            {cat.name}
          </Link>
      ))}
    </nav>
  )
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
}

export default CategoriesList
