import { Phone } from '@/down/Phone.gen';
import { useDown } from '@/down/store';
import { buildVM } from '@/down/vm';

/** The whole prototype is one screen with layered tabs and sheets, like the original. */
export default function Index() {
  const state = useDown();
  return <Phone vm={buildVM(state)} />;
}
