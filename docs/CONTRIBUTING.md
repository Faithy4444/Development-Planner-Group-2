# Contributing Guidelines

To keep our project organised, maintain a high quality of code, and collaborate effectively, we follow the **Feature Branch Workflow**. This guide outlines the entire process.

Following these rules ensures that our `main` branch is always stable and deployable.

## Our Branches

We use three types of branches:

*   **`main`**: This is the official production-ready code. No one ever commits directly to `main`. It is only updated by merging from `develop` during a release.

*   **`develop`**: This is our main integration branch. It contains all completed and reviewed features that are ready for the next release. This branch should always be stable.

*   **`feature/<short-description>`**: This is where all development work happens. Each new feature or bugfix must be done in its own `feature` branch.
    *   **Naming Convention:** Branches should be named descriptively, like `feature/user-login-api` or `feature/fix-navbar-bug`.

## The Step-by-Step Workflow

All work should follow this process.

### 1. Sync Your Local `develop` Branch

Before starting any new work, make sure your local `develop` branch is up-to-date with the remote repository.

```bash
git checkout develop
git pull origin develop
```

### 2. Create a New Feature Branch

Create your new `feature` branch from the up-to-date `develop` branch.

```bash
git checkout -b feature/your-new-feature-name
```

### 3. Code and Commit Your Changes

Do all your work on the `feature` branch. Make small, logical commits with clear and concise messages.

```bash
# After making changes
git add .
git commit -m "feat: add user authentication endpoint"
```

### 4. Push Your Branch

When your feature is complete, push your branch to the remote repository.

```bash
git push -u origin feature/your-new-feature-name
```

### 5. Create a Pull Request (PR)

-   Go to the repository on GitHub and create a new Pull Request.
-   Set the **base branch** to `develop` and the **compare branch** to your `feature` branch.
-   Write a clear title and a brief description of the changes.
-   Assign the other two developers as **reviewers**.

## Code Review Process

-   **Review:** At least **one** other team member must review the PR. Reviewers should provide constructive feedback and request changes if needed.
-   **Approve:** Once the reviewer is satisfied, they will approve the PR.
-   **Merge:** After the PR is approved, the original author can merge the branch into `develop`.
-   **Clean up:** Remember to delete the feature branch after it has been merged.