import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './AddItemForm.scss';

type AddItemFormTypes = {
  inputPlaceholder: string;
  addItem: (title: string) => void;
};

const AddItemForm = (props: AddItemFormTypes) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError(null);
  };

  const onEnterKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onAddButtonClickHandler();
    }
  };

  const onAddButtonClickHandler = () => {
    if (title.trim() === '') {
      setError('Title is required!');
    } else {
      props.addItem(title.trim());
      setTitle('');
    }
  };

  return (
    <div className="AddItemForm">
      <div className="input-wrapper">
        <input
          value={title}
          onChange={onInputChangeHandler}
          onKeyUp={onEnterKeyUpHandler}
          type="text"
          placeholder={props.inputPlaceholder}
        />
        <button onClick={onAddButtonClickHandler}>+</button>
      </div>
      {error && <h4 className="error-message">{error}</h4>}
    </div>
  );
};

export default AddItemForm;
