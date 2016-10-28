import React from 'react';
import {
    Textfield,
    List,
    ListItem,
} from 'react-mdl';
import debounce from 'lodash/debounce';

import './react-mdl-select.css';

class SelectField extends React.Component {

    constructor(props) {
        super(props);
        this.search = debounce(this.search, 100);
        this.state = {
            items: props.items,
            foundResult: props.items,
            keyField: props.keyField,
            valueField: props.valueField,
            showList: false,
            value: '',
        };
    }

    onChange(e) {
        e.persist();
        const value = e.target.value;
        this.setState({
            value: value,
        });
        this.search(value);
    }

    mouseSelect(item) {
        const valueField = this.state.valueField;
        const keyField = this.state.keyField;

        this.setState({
            value: item[valueField],
        });

        this.props.onChange(item[keyField]);
    }

    hideList() {
        setTimeout(() => {
            this.setState({
                showList: false,
            });
        }, 300);
    }

    showList() {
        this.setState({
            showList: true,
        });
    }

    search(value) {
        const foundItems = this.filterItems(value);

        this.setState({
            foundResult: foundItems,
        });
    }

    filterItems(value) {
        const result = [];
        const pattern = new RegExp(value, 'i');

        this.state.items.forEach((item) => {
            if (pattern.test(item.name)) {
                result.push(item);
            }
        });

        return result;
    }

    render() {
        return (
            <Textfield
              className={this.props.className}
              floatingLabel={this.props.floatingLabel}
              label={this.props.label}
              onFocus={this.showList.bind(this)}
              onBlur={this.hideList.bind(this)}
              value={this.state.value}
              onChange={this.onChange.bind(this)}
            >
                {(() => {
                    if (this.state.showList) {
                        return (
                            <List className="autocomplete-list">
                                {this.state.foundResult.map((item, index) => {
                                    return (
                                        <ListItem
                                          key={index}
                                          onClick={this.mouseSelect.bind(this, item)}
                                          className="autocomplete-list__found-item"
                                        >
                                            {item.name}
                                        </ListItem>
                                    );
                                })}
                            </List>
                        );
                    }
                })()}
            </Textfield>
        );
    }
}

export default SelectField;
