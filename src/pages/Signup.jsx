export const Signup = () => {
  return (
    <section className="sign-up">
      <div className="logo-container">
        <p>linkedin</p>
      </div>
      <div className="form-container">
        <form onSubmit={console.log('')}>
          <h1>Sign in</h1>
          <p>Stay updated on your professional world</p>
          <input type="text" />
          <input type="text" />
          <a href="">Forgot password?</a>

          <button className="sign-in-btn">Sign in</button>
          <div className="divider-container">
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <button className="sign-in-apple-btn">Sign in with Apple</button>
        </form>
        <div className="to-sign-up-container">
          <p>
            New to LinkedIn? <a href="">Join now</a>
          </p>
        </div>
      </div>

      <footer className="footer-container">
        <div className="footer">footer</div>
      </footer>
    </section>
  )
}
