import React from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';

import classNames from 'classnames/bind';
import styles from '../css/components/toyCreation';
const cx = classNames.bind(styles);


const MAX_SIZE = 3000000;
const MAX_PICTURES = 4;

function arrayUnique(arr, countExisingPictures) {
    var a = arr.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].name === a[j].name)
                a.splice(j--, 1);
        }
    }

    return a.slice(0, MAX_PICTURES - countExisingPictures);
}

function remove(arr, i) {
  var a = arr.concat();
  a.splice(i,1);
  return a;
}

function getSizeInMb(bytes) {
  var mb = bytes / 1000000;
  return +mb.toFixed(2);
}

const RenderDropzoneInput = ({ input, label, existingPictures, handleRemoveExistingPicture, meta: { touched, error } }) => {

    const files = input.value;
    
    return (
    <div className={'form-group' + (error && touched ? ' has-error' : '')}>
      <label htmlFor={input.name} className="col-sm-2 control-label">{label}</label>
      <div className="col-sm-10">
        <Dropzone
          name={input.name}
          accept="image/jpeg, image/png"
          className={cx('dropzone')}
          onDrop={( filesToUpload, e ) => { 
          var newFiles = files ? arrayUnique(files.concat(filesToUpload), existingPictures.length) : arrayUnique(filesToUpload, existingPictures.length); 
          input.onChange(newFiles)}}
        >
          <div className={cx('dz-instruction') + ' text-info'}>Glissez-déposez vos photos ici ou <span className="btn btn-default active">Cliquez pour les sélectionner.</span></div>
          <div className={cx('dz-instruction') + ' text-warning'}><i className={cx('marginRight') + ' fa fa-exclamation-triangle'} aria-hidden="true"></i>Seuls les .jpg et .png de moins de 3 MB seront acceptés</div>
          <div className={cx('dz-instruction') + ' text-warning'}><i className={cx('marginRight') + ' fa fa-exclamation-triangle'} aria-hidden="true"></i>Pas plus de 4 photos</div>
        </Dropzone>
          {files && Array.isArray(files) && files.length > 0 && (
          <div>
          
          <h3>{files.length === 1 ? 'Nouvelle image' : 'Nouvelles images'}</h3>
            { files.map((file, i) => (
            
            <div className={cx('dz-preview')} key={i}>
              <div className={cx('dz-image')}>
                 <img width="120" src={file.preview}/>
              </div>
              <div className={cx('dz-details')}>
                <div className={file.size > MAX_SIZE ? cx('dz-size-error') : cx('dz-size-valid')}>
                  <span><strong>{getSizeInMb(file.size)}</strong> MB</span>
                </div>
                { file.size > MAX_SIZE ? (
                  <div className={cx('dz-size-error')}>
                  <span><strong>Photo non acceptée</strong></span>
                </div>
                ) : ''
                }
                
              </div>
              <div className={cx('dz-remove')}>
                <a  href="javascript:undefined;" onClick={() => { input.onChange(remove(files, i)); }}><span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x"></i>
                      <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                    </span></a>
              </div>
            </div>)
             )
            }
          </div>
        )}
        {existingPictures && Array.isArray(existingPictures) && existingPictures.length > 0 && (
          <div>
          <h3>{existingPictures.length === 1 ? 'Image existante' : 'Images existantes'}</h3>
            { existingPictures.map((file, i) => (
              <div className={cx('dz-preview')} key={i}>
                <div className={cx('dz-image')}>
                   <img src={file.eager[1].secure_url} />
                </div>
                <div className={cx('dz-details')}>
                  <div className={cx('dz-size-valid')}>
                    <span><strong>{getSizeInMb(file.bytes)}</strong> MB</span>
                  </div>
                </div>
                <div className={cx('dz-remove')}>
                  <a  href="javascript:undefined;" onClick={() => { handleRemoveExistingPicture(file.public_id) }}><span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                      </span></a>
                </div>
              </div>
              ))
            }
          </div>
        )}
        {touched && error &&
          <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default RenderDropzoneInput;