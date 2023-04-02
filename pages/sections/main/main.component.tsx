import Button from '@/pages/components/button/button.component';
import Column from './components/column/column.component';

export default function Main() {
  return (
    <main className="flex gap-6 overflow-auto bg-light-grey px-4 py-6">
      {/* <div className="absolute top-1/2 -translate-y-1/2 px-4 text-center">
        <h2 className="heading-large mb-6 text-medium-grey">
          This board is empty. Create a new column to get started.
        </h2>
        <Button btnStyle="primaryLarge">
          <p className="heading-medium">Add New Column</p>
        </Button>
      </div> */}
      <Column />
      <Column />
      <Column />
    </main>
  );
}
