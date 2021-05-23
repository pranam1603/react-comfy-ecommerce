import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: {
      text, category, company, colors, max_price, price, min_price, shipping
    }, updateFilter, all_products, clearFilter
  } = useFilterContext()

  const allCategories = getUniqueValues(all_products, "category")
  const allColors = getUniqueValues(all_products, "colors")
  const allCompany = getUniqueValues(all_products, "company")

  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <input type="text" className="search-input" value={text} name="text" placeholder="Search" onChange={updateFilter} />
        </div>
        <div className="form-control">
          <h5>category</h5>
          <div>
            {allCategories.map((c, index) => {
              return (
                <button
                  key={index + c}
                  name="category"
                  type="button"
                  onClick={updateFilter}
                  className={`${category === c.toLowerCase() ? 'active' : null
                    }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
          {/* ------------------------------------ */}
        </div>
        <div className="form-control">
          <h5>company</h5>
          <select
            name="company"
            value={company}
            className="company"
            onChange={updateFilter}
          >
            {allCompany.map((c, index) => {
              return <option key={c + index} value={c}>{c}</option>
            })}
          </select>
        </div>
        {/* ------------------------------------ */}
        <div className="form-control">
          <h5>colors</h5>
          <div className="colors">
            {allColors.map((c, index) => {
              if (c === 'all') {
                return (
                  <button
                    key={index + c}
                    onClick={updateFilter}
                    name="colors"
                    className={`${colors === 'all' ? 'all-btn active' : ' all-btn'}`}
                    value='all'
                  >all</button>
                )
              }
              return (
                <button
                  key={index + c}
                  onClick={updateFilter}
                  name="colors"
                  style={{ background: c }}
                  className={`${colors === c ? 'color-btn active' : ' color-btn'}`}
                  value={c}
                >{colors === c ? <FaCheck /> : null}</button>
              )
            })}
          </div>
        </div>
        {/* ------------------------------------ */}
        <div className="form-control">
          <h5>price</h5>
          <p>{formatPrice(price)}</p>
          <div>
            <input type="range"
              name="price"
              onChange={updateFilter}
              max={max_price}
              min={min_price}
              value={price} />
          </div>
        </div>
        {/* ------------------------------------ */}
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            onChange={updateFilter}
            checked={shipping}
          ></input>
        </div>
      </form>
      <button type="button" className="clear-btn" onClick={clearFilter} >clear filter</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    // opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
