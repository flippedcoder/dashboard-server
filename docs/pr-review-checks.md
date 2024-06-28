# PR review checklist

## Things to look for in the code

These are things to check for when you review a PR:

- Does it solve the problem that was described in the ticket?
- Does it fit into the application architecture definition?
- Is it well architected as a whole?
- Does it follow the best practices specified by the team?
- Is the syntax correct?
- Does it improve or less the maintainability of the code base?
- Does it stick with the branding and styles or improve it?
- Does it account for security and vulnerabilities?
- Are there any dependency changes?
- Have unit tests been written or updated for the new functionality?
- Has the documentation been updated with new props or implementation?
- Are there comments in the code that should be deleted?

## More important things to check

Making sure the code is well-written is only one aspect of the review. You should always pull down the branch and run the code locally. Then you can check for things like:

- If the implementation matches the designs
- Dependencies install and the app runs correctly
- All of the tests are passing
- Test out if the implementation has any edge cases that need to be addressed, like empty states or error states
- Check the console in the browser for warnings or errors
- Check the Network tab to see if there are multiple requests being made unnecessarily

## Tips for good reviews

- Always provide relevant reasons, resources, and examples when you disagree with implementation. Sometimes code comes down to a matter of opinion and you have to be ok not forcing your will onto everyone.
- Provide constructive feedback. **Don't** say something like, `This is wrong and messy. Do you not understand array methods?`. Instead say something like, `I see what you were doing there. What if you checked out this array method instead? It would make the code more readable and uses less lines.`
- Be very specific about the changes you are looking for. Grammar matters here so if you feel the say `it`, change it a specific thing like the variable name or line of code you mean.
