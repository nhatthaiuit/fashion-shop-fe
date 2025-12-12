export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: gọi API đăng ký nếu có
    alert("Đăng ký (demo) thành công!");
  };

  return (
    <main className="register_container">
      <h2 className="section_title">REGISTER</h2>
      <form className="register_form" onSubmit={handleSubmit}>
        <div className="form_row">
          <label>User Name</label>
          <input name="user_name" type="text" required placeholder="johndoe" />
        </div>
        <div className="form_row">
          <label>Email</label>
          <input name="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="form_row">
          <label>Password</label>
          <input type="password" required placeholder="••••••••" />
        </div>
        <button className="btn_primary" type="submit">
          Create account
        </button>
      </form>
    </main>
  );
}
