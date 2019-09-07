import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Selected from '../icons/Selected'
import EggEmpty from '../icons/EggEmpty'
import EggLow from '../icons/EggLow'
import EggMid from '../icons/EggMid'
import EggFull from '../icons/EggFull'
import EggComplete from '../icons/EggComplete'

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 95%;
  min-width: 95%;
`

const Placeholder = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
`

const Card = styled.div`
  display: flex;
  padding: .2em 0;
  width: 100%;
  min-width: 100%;
`

const ImgContainer = styled.div`
  display: flex;
  padding-right: .3em;

  .selected-container {
    padding: 1em .4em 1em 0;
  }

  img {
    width: 65px;
    height: 40px;
    padding-top: .4em;
  }
`

const InformationContainer = styled.div`
  padding-left: .3em;
  .title {
    font-size: 14px;
    color: #00A6F0;
  }

  .selected {
    color: #00A6F0;
  }

  .desc {
    color: #111111;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
  }

  .goal {
    display: flex;
    color: #BDBDBD;
    padding: .4em 0 .2em 0;
    font-size: 11px;
    font-weight: 500;
    line-height: 17px;

    svg {
      padding-right: 5px;
    }
  }
`

const CardsIsolated = ({ id, title, selectedId, selectedName, imageUrl, description, goal, reached, nb_product_sold, currency, type }) => {

  const percentPriceReached = Math.round((reached / goal) * 100)
  const percentSoldReached = Math.round((nb_product_sold / goal) * 100)

  const CorrectEgg = (percent) => {
    if (percent <= 15) {
      return <EggEmpty width="14px" height="16px" />
    } else if (percent >= 15 && percent <= 45) {
      return <EggLow width="14px" height="16px" />
    } else if (percent >= 45 && percent <= 75) {
      return <EggMid width="14px" height="16px" />
    } else if (percent >= 75 && percent < 100) {
      return <EggFull width="14px" height="16px" />
    } else if (percent >= 100) {
      return <EggComplete width="14px" height="16px" />
    } else {
      return
    }
  }

  return (
    <CardsContainer>
      <Card>
        <ImgContainer>
          <span className="selected-container">{selectedId.includes(id) ? <Selected width="10px" height="10px"/> : <Placeholder />}</span>
          <img src={imageUrl} alt='project banner'/>
        </ImgContainer>
        <InformationContainer>
          <span className="title"> {title} </span>
          <div className="desc"> {description} </div>
          <div className="goal">
            {type === 1 ? CorrectEgg(percentSoldReached) : CorrectEgg(percentPriceReached)}
            {type === 1 ? `${nb_product_sold} / ${goal}` : goal}
            {type === 2 && currency}
          </div>
        </InformationContainer>
      </Card>
    </CardsContainer>
  )
}

CardsIsolated.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  selectedId: PropTypes.array,
  selectedName: PropTypes.array,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  goal: PropTypes.number,
  reached: PropTypes.number,
  nb_product_sold: PropTypes.number,
  currency: PropTypes.string,
  type: PropTypes.oneOf([ 1, 2 ])
}

export default CardsIsolated
