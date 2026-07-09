import { useCallback, useState } from "react";

type AnyActionState = Record<string, any> | undefined;

export default function useActionState<AS = AnyActionState, FD = FormData>(
  action: (prevState: AS | undefined, formData: FD) => Promise<AS>,
  initialState?: AS,
) {
  const [state, setState] = useState<AS | undefined>(initialState);
  const [isPending, setIsPending] = useState(false);

  const formAction = useCallback(
    async (eventOrForm?: Event | FormData | HTMLFormElement) => {
      setIsPending(true);
      try {
        let formData: FormData;

        if (eventOrForm instanceof FormData) {
          formData = eventOrForm;
        } else if (eventOrForm instanceof HTMLFormElement) {
          formData = new FormData(eventOrForm);
        } else if (
          eventOrForm &&
          typeof (eventOrForm as Event).preventDefault === "function"
        ) {
          const ev = eventOrForm as Event;
          ev.preventDefault();
          const form = ev.currentTarget as HTMLFormElement | null;
          formData = new FormData(form ?? undefined);
        } else {
          formData = new FormData();
        }

        const result = await action(state, formData as FD);
        setState(result);
        return result;
      } catch (err) {
        setState((prev: any) => ({ ...(prev as any), error: String(err) }));
        return undefined;
      } finally {
        setIsPending(false);
      }
    },
    [action, state],
  );

  return [state, formAction, isPending] as const;
}
