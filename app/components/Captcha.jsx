import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { recaptcha } from '../../config/secrets';

const Captcha = (props) => (
  <div>
    <div className='form-group'>
      <div className="col-sm-2"></div>
      <div className="col-sm-10">
          <ReCAPTCHA
          sitekey={recaptcha.siteKey}
          size='compact'
          onChange={response => props.input.onChange(response)}
        />
        {props.meta.touched && props.meta.error && <div className="text-danger">{props.meta.error}</div>}
      </div>
    </div>
  </div>
);

Captcha.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default Captcha;