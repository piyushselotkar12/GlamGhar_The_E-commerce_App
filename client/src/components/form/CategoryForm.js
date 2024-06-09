import React from 'react';

const CategoryForm = ({ value, setValue, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-3'>
        <input type="text" className="form-control mb-2" placeholder="Enter category name" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  );
}
export default CategoryForm;

