interface LoginInfo {
  username: string;
  password: string;
}

export default function LoginPage() {
  return (
    <main className="bg-100">
      <form action="http://localhost:8000/auth/login" method="POST">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}

async function attemptLogin(credentials: LoginInfo) {}
