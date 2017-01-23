import React, {
  Component,
  PropTypes
}
from 'react';

const ENTER_KEY_CODE = 13;

export default class SearchBarsTextInput extends Component {
  constructor(props) {
      super(props);
      this.onSearch = this.onSearch.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
    }
    /*
     * Invokes the callback passed in as onSearch, allowing this component to be
     * used in different ways. I personally think this makes it more reusable.
     */
  onSearch() {
    const {
      onBarsSearch,
      location
    } = this.props;
    onBarsSearch(location);
  }

  /*
   * Invokes the callback passed in as onChange, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  onChange(event) {
    const {
      onEntryChange
    } = this.props;
    onEntryChange(event.target.value);
  }

  /*
   * @param  {object} event
   */
  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onSearch();
    }
  }

  render() {
    const {
      className,
      placeholder,
      location
    } = this.props;
    return (
      <div className="row">
        <div className="col-xs-10">
          <input
            className={className}
            placeholder={placeholder}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            value={location}
            autoFocus />
        </div>
        <div className="col-xs-2">
          <button className="btn btn-success" onClick={this.onSearch}>Search</button>
        </div>
      </div>
    );
  }
}

SearchBarsTextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  location: PropTypes.string,
  onBarsSearch: PropTypes.func,
  onEntryChange: PropTypes.func
};
