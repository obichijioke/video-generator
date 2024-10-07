export function Timeline() {
  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex space-x-2">
        {['Intro scene', 'Scene 1', 'Scene 2', 'Scene 3', 'Scene 4', 'Scene 5', 'Scene 6'].map((scene, index) => (
          <div key={index} className="flex-shrink-0 w-32 h-20 border rounded flex items-center justify-center text-sm">
            {scene}
          </div>
        ))}
      </div>
    </div>
  );
}
