import { useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center" style={{position: 'fixed', zIndex: 9999}}>
      <div className="bg-white rounded-lg p-8 shadow-lg" style={{width: '50%', maxWidth: '600px'}}>
        <h2 className="text-lg font-medium mb-4">Configure OpenAI API</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="api-key" className="block font-medium mb-2">
              API Key
            </label>
            <input
              type="text"
              id="api-key"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              className="border border-gray-400 rounded-lg px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block font-medium mb-2">
              Model
            </label>
            <select
              id="model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="model-select"
            >
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option value="gpt-4">gpt-4</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-4" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
