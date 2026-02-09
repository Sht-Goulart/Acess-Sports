export default function UnderDevelopment() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
      <div className="relative">
        <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-6xl text-primary">construction</span>
        </div>
        <div className="absolute -bottom-2 -right-2 size-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
           <span className="material-symbols-outlined text-primary">engineering</span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800">Em Desenvolvimento</h3>
        <p className="text-gray-500 text-sm italic">
          "Esta categoria está sendo desenvolvida com muito carinho pelos nossos desenvolvedores."
        </p>
      </div>
      <div className="pt-4 flex gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}
