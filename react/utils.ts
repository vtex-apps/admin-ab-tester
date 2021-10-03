export const checkWorkspaceName = (name: string) => {
  if (name === "") return false
  const noSpecialChars = new RegExp(
    '^.*[-!$%^&*()_+|~=`{}[\\]:";\'<>?,./]+.*$'
  );
  const noMayusc = new RegExp('[A-Z]');
  if (!noSpecialChars.test(name) && !noMayusc.test(name)) {
    return true;
  } else {
    return false;
  }
};
