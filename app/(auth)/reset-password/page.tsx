export default function ResetPasswordPage({
  params,
}: {
  params: { token: string[] };
}) {
  const token = params.token?.join("/");
  return <h1>Reset Password with token: {token}</h1>;
}
