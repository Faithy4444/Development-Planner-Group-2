# Contributing Guidelines

Thank you for your interest in contributing to the **PlanYourFuture** project! To keep our project organized, maintain a high quality of code, and collaborate effectively, we follow a standard set of guidelines.

Following these rules ensures that our `main` branch is always stable and ready for a production release.

## Code of Conduct
This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Our Git Workflow: Feature Branch

We use a **Feature Branch Workflow** with a `develop` branch acting as our main integration point. This means all new work is done on separate, descriptive branches.

### Branch Naming Convention

Your branch name should clearly describe the feature or bug you are working on. We use the following prefixes:
-   **`feat/`**: For a new feature (e.g., `feat/add-mentor-feedback-form`).
-   **`fix/`**: For a bug fix (e.g., `fix/correct-dashboard-display-error`).
-   **`docs/`**: For changes to documentation (e.g., `docs/update-readme`).

### The Step-by-Step Workflow

All work should follow this process to ensure a clean and logical project history.

**1. Sync Your Local `develop` Branch**

Before starting any new work, make sure your local `develop` branch is up-to-date with the remote repository on GitHub.

```bash
git checkout develop
git pull origin develop
```

**2. Create a New Feature Branch**

Create your new `feature` branch from the up-to-date `develop` branch. Use the naming convention described above.

```bash
# Example for a new feature
git checkout -b feat/add-goal-editing-ui
```

**3. Code and Commit Your Changes**

Do all your work on your new feature branch. As you work, make small, logical commits.

**Commit Message Style**

To keep our project history clean, please follow the **Conventional Commits** style. Each message should be prefixed with a type.

-   **`feat:`** (new feature)
-   **`fix:`** (bug fix)
-   **`docs:`** (documentation)
-   **`style:`** (code formatting)
-   **`refactor:`** (code changes that neither fix a bug nor add a feature)
-   **`test:`** (adding or correcting tests)

**Examples:**
```bash
# Example of a good commit
git add .
git commit -m "feat: Add 'Share Plan' button to dashboard header"

# Another example
git commit -m "fix: Correct API endpoint URL for fetching feedback"
```

**4. Push Your Branch to GitHub**

When your feature is complete and ready for review, push your branch to the remote repository.

```bash
# The -u flag sets the upstream for the first push
git push -u origin feat/add-goal-editing-ui
```

**5. Create a Pull Request (PR)**

-   Go to our repository on GitHub. You will see a prompt to create a new Pull Request from your recently pushed branch.
-   Set the **base branch** to `develop`. The **compare branch** will be your feature branch.
-   Write a clear and descriptive title (e.g., "Feature: Implement Goal Editing UI").
-   In the PR description, provide a brief summary of the changes.
-   **Link the issue you are solving.** Use a keyword like `Closes #17` or `Fixes #23`. This will automatically link your PR to the ticket on our project board and will close the ticket when the PR is merged.
-   Assign your other two teammates as **reviewers**.

## Code Review Process

A code review is a crucial part of our quality process.

-   **Review:** At least **one** other team member must review your Pull Request. Reviewers should aim to be constructive, asking questions and providing clear feedback.
-   **Discussion:** If there are questions or requested changes, discuss them in the PR comments. Make any necessary code changes by committing and pushing to your feature branch again. The PR will update automatically.
-   **Approve:** Once the reviewer is satisfied with the changes, they will approve the PR.
-   **Merge:** After the PR is approved, the original author of the PR is responsible for merging it into the `develop` branch.
-   **Clean up:** Remember to delete your feature branch from the remote repository after it has been successfully merged. GitHub provides a button for this.

Thank you for your contribution!
