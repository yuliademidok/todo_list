const AddTodo = () => {
  return (
    <form>
      <h1>Add todo</h1>
      <div>
        <input
          label="Title"
          required
          // onChange={handleChange}
          name="title"
          type="text"
          placeholder="Todo title"
          // value={title}
        />
        <input
          label="Description"
          required
          // onChange={handleChange}
          name="description"
          type="text"
          placeholder="Todo Description"
          // value={description}
        />

        <div>
          <ul>
            <li>Low</li>
            <li>Medium</li>
            <li>High</li>
          </ul>
        </div>

        <button type="submit">Add todo</button>
      </div>
    </form>
  );
};

export default AddTodo;
