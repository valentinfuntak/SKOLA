export default function Settings() {
    return (
        <div class="bg-base-300 w-full h-full p-5 mt-11 rounded-2xl">
            <h1 class="text-3xl mb-5">Postavke</h1>
            
            <div class="space-y-4">
                {/* Tema */}
                <div>
                    <h2 class="text-xl font-semibold">Tema</h2>
                    <select class="w-full p-2 rounded bg-gray-700 text-white">
                        <option>Svijetla</option>
                        <option>Tamna</option>
                        <option>Automatski</option>
                    </select>
                </div>
                
                {/* Jezik */}
                <div>
                    <h2 class="text-xl font-semibold">Jezik</h2>
                    <select class="w-full p-2 rounded bg-gray-700 text-white">
                        <option>Hrvatski</option>
                        <option>English</option>
                    </select>
                </div>
                
                {/* Notifikacije */}
                <div>
                    <h2 class="text-xl font-semibold">Notifikacije</h2>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-5 h-5" />
                        <span>Omogući notifikacije</span>
                    </label>
                </div>
            </div>
        </div>
    );
}