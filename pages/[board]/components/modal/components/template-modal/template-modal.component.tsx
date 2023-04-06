type Props = {
  children: JSX.Element[];
};

export default function TemplateModal({ children }: Props) {
  return (
    <>
      <div className="fixed inset-0 z-40 h-full w-full bg-black opacity-60" />
      <div className="fixed left-1/2 top-1/2 z-50 flex w-[343px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-md bg-white p-6">
        {children}
      </div>
    </>
  );
}
