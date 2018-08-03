import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCheck } from '@fortawesome/free-solid-svg-icons';

class CategorySelect extends Component {
  render() {
    const {
      categories, categoriesOpen, toggleCategoriesList, handleCategorySelect,
    } = this.props;

    return (
      <div>
        <FontAwesomeIcon
          className="pointer gray dim black-40 mh4"
          icon={faTag}
          size="2x"
          onClick={toggleCategoriesList}
        />
        {categoriesOpen ? (
          <ul className="list absolute bg-white black-90 ba b--light-silver br3 pb3 pt3 ph0 ma4 z-999 w-auto minwidth-300 positionCategories">
            {categories.map(item => (
              <li
                className="listItem ph0 pv2"
                key={item.title}
                onClick={() => handleCategorySelect(item.id)}
                role="presentation"
              >
                <div className="ml3 dib w-10">
                  {item.selected && <FontAwesomeIcon icon={faCheck} />}
                </div>
                <div className="pa0 dib">{item.title}</div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default CategorySelect;

CategorySelect.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesOpen: PropTypes.bool.isRequired,
  toggleCategoriesList: PropTypes.func.isRequired,
  handleCategorySelect: PropTypes.func.isRequired,
};

CategorySelect.defaultProps = {
  categories: [],
};
