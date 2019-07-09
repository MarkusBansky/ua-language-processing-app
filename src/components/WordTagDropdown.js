import _ from 'lodash'
import React from 'react'
import { Dropdown, Button, Menu } from 'antd';

class WordTagDropdown extends React.Component {
  constructor(params) {
    super(params)

    const { word } = this.props

    this.state = {
      selectedVariation: word.getBestVariation()
    }

    this.handleDropdownMenuClick = this.handleDropdownMenuClick.bind(this)
  }

  createMenuForDropdown(variations) {
    return <Menu onClick={this.handleDropdownMenuClick}>
      {_.map(variations, (v, i) => {
        let d = this.state.selectedVariation === v
        return <Menu.Item key={i} disabled={d}>{v.toString()}</Menu.Item>
      })}
    </Menu>
  }

  handleDropdownMenuClick(e) {
    const { word } = this.props
    const { variations } = word

    this.setState({ ...this.state, selectedVariation: variations[e.key] })
  }

  render() {
    const { word } = this.props
    const { selectedVariation } = this.state
    const menu = this.createMenuForDropdown(word.variations)

    return <Dropdown overlay={menu} placement="topCenter">
      <Button>{selectedVariation.toString()}</Button>
    </Dropdown>
  }
}

export default WordTagDropdown
