import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import './EditableSpan.scss';

type EditableSpanPropsType = {
  title: string;
  elemClassName: string;
  onChangeHandler: (title: string) => void;
};

const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChangeHandler(event.currentTarget.value);
  };

  const onEnterKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      setEditMode(!editMode);
    }
  };

  return (
    <div className="EditableSpan">
      {editMode ? (
        <input
          autoFocus
          onKeyUp={onEnterKeyUpHandler}
          onBlur={toggleEditMode}
          onChange={changeHandler}
          className={props.elemClassName}
          value={props.title}
          type="text"
        />
      ) : (
        <span onClick={toggleEditMode} className={props.elemClassName}>
          {props.title}
        </span>
      )}
    </div>
  );
};

export default EditableSpan;
