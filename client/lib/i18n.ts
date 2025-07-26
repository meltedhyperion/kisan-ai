type Translation = {
    [key: string]: {
        [lang: string]: string;
    }
}

const translations: Translation = {
    // Profile Page
    myProfile: { English: 'My Profile', 'हिन्दी': 'मेरी प्रोफ़ाइल' },
    viewAndManage: { English: 'View and manage your account details.', 'हिन्दी': 'अपने खाते का विवरण देखें और प्रबंधित करें।' },
    age: { English: 'Age', 'हिन्दी': 'आयु' },
    preferredLanguage: { English: 'Preferred Language', 'हिन्दी': 'पसंदीदा भाषा' },
    location: { English: 'Location', 'हिन्दी': 'स्थान' },
    editProfile: { English: 'Edit Profile', 'हिन्दी': 'प्रोफ़ाइल संपादित करें' },
    logout: { English: 'Logout', 'हिन्दी': 'लॉग आउट' },

    // Bottom Nav
    explore: { English: 'Explore', 'हिन्दी': 'अन्वेषण' },
    alerts: { English: 'Alerts', 'हिन्दी': 'चेतावनी' },
    myFarms: { English: 'My Farms', 'हिन्दी': 'मेरे खेत' },
    profile: { English: 'Profile', 'हिन्दी': 'प्रोफ़ाइल' },

    // Alerts Page
    alertsPageTitle: { English: 'Alerts', 'हिन्दी': 'चेतावनी' },
    alertsPageDescription: { English: 'You have {unreadCount} new alerts.', 'हिन्दी': 'आपके पास {unreadCount} नई चेतावनियाँ हैं।' },
    loadingAlerts: { English: 'Loading alerts...', 'हिन्दी': 'चेतावनी लोड हो रही हैं...' },
    markAsRead: { English: 'Mark as Read', 'हिन्दी': 'पढ़ा हुआ चिह्नित करें' },

    // Explore Page
    explorePageTitle: { English: 'Explore', 'हिन्दी': 'अन्वेषण करें' },
    explorePageDescription: { English: 'Latest news and advisories for you', 'हिन्दी': 'आपके लिए नवीनतम समाचार और सलाह' },
    source: { English: 'Source: {source}', 'हिन्दी': 'स्रोत: {source}' },

    // My Farms Page
    myFarmsPageTitle: { English: 'My Farms', 'हिन्दी': 'मेरे खेत' },
    myFarmsPageDescription: { English: 'Manage your farms and view analytics.', 'हिन्दी': 'अपने खेतों का प्रबंधन करें और विश्लेषण देखें।' },
    noFarmsFound: { English: 'No farms found', 'हिन्दी': 'कोई खेत नहीं मिला' },
    addFirstFarm: { English: 'Add your first farm to get started.', 'हिन्दी': 'शुरू करने के लिए अपना पहला खेत जोड़ें।' },
    addNewFarm: { English: 'Add new farm', 'हिन्दी': 'नया खेत जोड़ें' },
    
    // Add Farm Dialog
    addFarmDialogTitle: { English: 'Add a New Farm', 'हिन्दी': 'एक नया खेत जोड़ें' },
    addFarmDialogDescription: { English: 'Enter the details for your new farm to start tracking.', 'हिन्दी': 'ट्रैकिंग शुरू करने के लिए अपने नए खेत का विवरण दर्ज करें।' },
    farmName: { English: 'Farm Name', 'हिन्दी': 'खेत का नाम' },
    crop: { English: 'Crop', 'हिन्दी': 'फ़सल' },
    areaAcres: { English: 'Area (acres)', 'हिन्दी': 'क्षेत्र (एकड़)' },
    cancel: { English: 'Cancel', 'हिन्दी': 'रद्द करें' },
    addFarm: { English: 'Add Farm', 'हिन्दी': 'खेत जोड़ें' },
    
    // Farm Analytics Page
    sensorDataHistory: { English: 'Sensor Data History', 'हिन्दी': 'सेंसर डेटा इतिहास' },
    manageBandhuDevices: { English: 'Manage Bandhu Devices', 'हिन्दी': 'बंधु उपकरणों का प्रबंधन करें' },

    // AI Summary
    aiSummaryTitle: { English: 'AI-Powered Summary', 'हिन्दी': 'एआई-संचालित सारांश' },
    aiSummaryDescription: { English: 'A quick overview of your farm\'s recent activity.', 'हिन्दी': 'आपके खेत की हाल की गतिविधि का एक त्वरित अवलोकन।' },

    // Bandhu Manager
    remove: { English: 'Remove', 'हिन्दी': 'हटाएं' },
    addNewBandhuDevice: { English: 'Add New Bandhu Device', 'हिन्दी': 'नया बंधु डिवाइस जोड़ें' },
    bandhuDialogDescription: { English: 'Enter the hardware ID of your new Bandhu device to link it to this farm.', 'हिन्दी': 'इस खेत से जोड़ने के लिए अपने नए बंधु डिवाइस की हार्डवेयर आईडी दर्ज करें।' },
    hardwareId: { English: 'Hardware ID', 'हिन्दी': 'हार्डवेयर आईडी' },
    addDevice: { English: 'Add Device', 'हिन्दी': 'डिवाइस जोड़ें' },

    // Agent Chat
    askAgent: { English: 'Ask AI Assistant', 'हिन्दी': 'एआई सहायक से पूछें' },
    agentTitle: { English: 'Kisan Saathi Assistant', 'हिन्दी': 'किसान सारथी सहायक' },
    agentPlaceholder: { English: 'Ask about your farms, alerts, etc.', 'हिन्दी': 'अपने खेतों, चेतावनियों आदि के बारे में पूछें।' },
    agentError: { English: 'Sorry, I encountered an error. Please try again.', 'हिन्दी': 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।' },
    tapToSpeak: { English: 'Tap the mic to speak', 'हिन्दी': 'बोलने के लिए माइक पर टैप करें' },
    listening: { English: 'Listening...', 'हिन्दी': 'सुन रहा है...' },
    startListening: { English: 'Start Listening', 'हिन्दी': 'सुनना शुरू करें' },
    stopListening: { English: 'Stop Listening', 'हिन्दी': 'सुनना बंद करें' },
    listen: { English: 'Listen', 'हिन्दी': 'सुनो' },
    stop: { English: 'Stop', 'हिन्दी': 'रुको' },

};

export const i18n = {
    translations,
};
