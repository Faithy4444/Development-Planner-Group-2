import { Navbar } from "../components/layout/Navbar";
import "./DemoPage.css";
import { Navigate } from "react-router-dom";

const DemoPage = () => {
  const useAuth = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };
  const isAuth = useAuth();
  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Navbar />

      <div className="demo-page">
        <h1 className="hero-headline">
          Welcome to the
          <span className="hero-headline-pink"> Plan</span>YourFuture
        </h1>
        <section>
          <h2>About the project</h2>
          <p>
            PlanYourFuture is a web application designed to help CodeYourFuture
            graduates take control of their professional development. It
            provides a platform for setting SMART goals, tracking progress
            through actionable tasks, and collaborating with mentors to receive
            valuable feedback.
          </p>
          <img src="/Screenshot 2026-02-20 at 18.24.48.png"></img>
        </section>
        <section>
          <h2>Read-Only Mentor Page</h2>
          <p>
            When user make plan available, they get a link to public page they
            can send to mentor, where a mentor can view all of the user's
            selected public goals and tasks. All editing controls are hidden on
            this page.
          </p>
          <img src="/Screenshot 2026-02-20 at 18.53.53.png"></img>
        </section>
        <section>
          <h2>Mentor Feedback System</h2>
          <p>
            The public share page includes a functional feedback form. This
            feedback will appear in dedicated section on graduate's dashboard.
          </p>
          <img src="/Screenshot 2026-02-20 at 18.54.01.png"></img>
        </section>
        <section>
          <h2>Email reminders</h2>
          <p>
            Our app will send email reminders of active goals on the first day
            of each month, as well as upcoming reminders one week before a
            goal's deadline.
          </p>
          <img src="/Screenshot 2026-01-13 at 19.54.36 copy.png"></img>
        </section>
      </div>
    </>
  );
};
export default DemoPage;
