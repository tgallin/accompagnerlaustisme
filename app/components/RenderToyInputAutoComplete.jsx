import React, { Component, PropTypes } from 'react';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { fetchToysByNameOrRef } from '../fetch-data/fetchToyLibraryData';
import { labelColClassName, inputColClassName } from '../js/utils/componentUtils';

import classNames from 'classnames/bind';

import styles from '../css/components/autocomplete';

const cx = classNames.bind(styles);

class RenderToyInputAutoComplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialToy ? props.initialToy.name : '',
      toys: props.initialToy ? [props.initialToy] : [],
      loading: false
    };
    this.renderItems = this.renderItems.bind(this);
  }
  
  renderItems(items) {
    return items.map((item, index) => {
        return item;
    });
  }

  render() {
    
    const { input, label, placeholder, help, size, meta: { touched, error }, selectToy, formName, inputToUpdate } = this.props;
    
    return (
      <div className={'form-group' + (error && touched ? ' has-error' : '')}>
        <label htmlFor={input.name} className={'control-label ' + labelColClassName(size)}>{label}</label>
        <div className={inputColClassName(size)}>
            <Autocomplete
              {...input}
              value={this.state.value}
              inputProps={{ id: input.name, size: '32', className: 'form-control' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block', width: '280px' }}
              items={this.state.toys}
              getItemValue={(item) => item.name}
              onSelect={(value, toy) => {this.setState({ value, toys: [toy] }); selectToy(toy.id, formName, inputToUpdate);} }
              onChange={(event, value) => {
                this.setState({ value, loading: true, toys: [] });
                selectToy(null, formName, inputToUpdate);
                fetchToysByNameOrRef(value, (items) => {
                  this.setState({ toys: items, loading: false });
                });
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  className={cx('item') + (isHighlighted ? ' ' + cx('item-highlighted') : '')}
                  key={item.id}
                >{item.name}</div>
              )}
              renderMenu={(items, value) => (
                <div className={cx('menu')}>
                  {value === '' ? (
                    <div className={cx('item')}>{placeholder}</div>
                  ) : this.state.loading ? (
                    <div className={cx('item')}>Chargement...</div>
                  ) : items.length === 0 ? (
                    <div className={cx('item')}>Aucun jeu trouvé pour '{value}'. </div>
                  ) : this.renderItems(items)}
                </div>
              )}
            />
          {help && <span id="helpBlock" className="help-block">{help}</span>}
          {touched && error && <div className="text-danger">{error}</div>}
        </div>
      </div>
    );
  }
}

RenderToyInputAutoComplete.propTypes = {
  input: PropTypes.object.isRequired
};

export default connect(null, {
  selectToy: (toyId, formName, inputName) => change(formName, inputName, toyId)
})(RenderToyInputAutoComplete);