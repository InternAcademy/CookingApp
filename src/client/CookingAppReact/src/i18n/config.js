import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";

export const supportedLngs = {
  en: "English",
  bg: "Български",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  es: "Español",
  pt: "Português",
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: Object.keys(supportedLngs),
  resources: {
    en: {
      translation: {
        chatwarn: "Meal Master may occasionally make mistakes.",
        lnt: "Language and theme",
        LightTheme: "Light",
        DarkTheme: "Dark",
        SunnyTheme: "Sunny Light",
        CoolTheme: "Cool Light",
        WarmTheme: "Warm Dark",
        SaveChanges: "Save Preferences",
        FoodPreferences: "Food Preferences",
        None: "None",
        Vegetarian: "Vegetarian",
        Vegan: "Vegan",
        Allergens: "Allergens",
        NoAdded: "None Added",
        AddAllergen: "Add Allergen",
        DislikedFoods: "Disliked Foods",
        AddFood: "Add Food",
        GeneratingMeal: "Generating Meal",
        GenerateMeal: "Generate Meal",
        GetPremium: "Marketplace",
        MyMeals: "My Meals",
        LoadMore: "Load more...",
        NoRecipes: "You don't have any recipes",
        Loading: "Loading",
        YourSubscription: "Your Subscription",
        Dashboard: "Dashboard",
        NoChats: "You don't have any chats",
        RulesNPolicies: "Rules & Policies",
        Settings: "Settings",
        Subscription: "Subscription",
        SignOut: "Sign Out",
        Upload: "Upload",
        CopyUserId: "Copy User Id",
        Profile: "Profile",
        WhatToCook: "What do you want to cook today?",
        LookingForFav: "Looking for your favourite meal?",
        AddAllergens: "Add your allergens",
        AddDisliked: "Add your disliked foods",
        Warning: "Warning",
        YouHave: "you have",
        MessagesLeft: "messages left",
        FileError:
          "Please select a valid image file. Supported types: JPEG, PNG, WEBP",
        ImageLimitError:
          "Maximum image size exceeded. Please select an image under 2MB.",
        Ingredients: "Ingredients",
        PreparationSteps: "Preparation Steps",
        TastersChoice: "Taster’s Choice",
        Messages10Meals: "700 Messages + 10 Meals",
        p1descr:
          "Ideal for light users who want an introduction to the service with essential features.",
        Getnow: "Get now",
        ChefsSelection: "Chef’s Selection",
        Messages25Meals: "1,500 Messages + 25 Meals",
        p2descr:
          "Best suited for regular users looking for a balance between messages and meal options.",
        GourmetsDelight: "Gourmet’s Delight",
        Messages50Meals: "3,500 Messages + 50 Meals",
        p3descr:
          "Perfect for frequent users who want more messages and meals at a great value.",
        Exploreoursubscriptionplan: "Explore our subscription plan:",
        Hotoffer: "Hot offer",
        Unlimitedmessages: "Unlimited messages",
        Unlimitedchats: "Unlimited chats",
        Meals: "30 Meals",
        Customizabledietaryoptions: "Customizable dietary options",
        Freecancellation: "Free cancellation",
        Subscribe: "Subscribe",
        month: "€14.99/month",
        Yourubscription: "Your subscription plan:",
        Premium: "Premium",
        eamonth: "€ a month",
        Createdon: "Created on",
        Yoursubscriptionhasbeen:
          "Your subscription has been cancelled and it will expire on ",
        Yournextchargewillbeon: "Your next charge will be on ",
        Cancelled: "Cancelled",
        CancelSubscription: "Cancel Subscription",
        Areyousureyouwant: "Are you sure you want to cancel your subscription?",
        No: "No",
        Yes: "Yes",
        Cancelling: "Cancelling...",
        Cancel: "Cancel",
      },
    },
    bg: {
      translation: {
        chatwarn: "Meal Master може понякога да прави грешки.",
        lnt: "Език и тема",
        LightTheme: "светлина",
        DarkTheme: "Тъмно",
        SunnyTheme: "Слънчева светлина",
        CoolTheme: "Хладна светлина",
        WarmTheme: "Топло Тъмно",
        SaveChanges: "Запазване на предпочитанията",
        FoodPreferences: "Хранителни предпочитания",
        None: "Няма",
        Vegetarian: "Вегетарианец",
        Vegan: "Веган",
        Allergens: "Алергени",
        NoAdded: "Няма добавени",
        AddAllergen: "Добавяне на алерген",
        DislikedFoods: "Нехаресвани храни",
        AddFood: "Добавяне на храна",
        GeneratingMeal: "Генериране на ястие",
        GenerateMeal: "Генериране на ястие",
        GetPremium: "Пазар",
        MyMeals: "Моите ястия",
        LoadMore: "Зареди още...",
        NoRecipes: "Нямате никакви рецепти",
        Loading: "Зарежда се",
        YourSubscription: "Вашият абонамент",
        Dashboard: "Табло за управление",
        NoChats: "Нямате никакви чатове",
        RulesNPolicies: "Правила и политики",
        Settings: "Настройки",
        Subscription: "Абонамент",
        SignOut: "Излезте",
        Upload: "Качване",
        CopyUserId: "Копиране на потребителско име",
        Profile: "Профил",
        WhatToCook: "Какво искаш да сготвиш днес?",
        LookingForFav: "Търсите любимото си ястие?",
        AddAllergens: "Добавете вашите алергени",
        AddDisliked: "Добавете храните, които не харесвате",
        Warning: "Предупреждение",
        YouHave: "имате",
        MessagesLeft: "оставени съобщения",
        FileError:
          "Моля, изберете валиден файл с изображение. Поддържани типове: JPEG, PNG, WEBP",
        ImageLimitError:
          "Максималният размер на изображението е надвишен. Моля, изберете изображение под 2 MB.",
        Ingredients: "Съставки",
        PreparationSteps: "Стъпки на подготовка",
        TastersChoice: "Изборът на дегустатора",
        Messages10Meals: "700 съобщения + 10 ястия",
        p1descr:
          "Идеален за леки потребители, които искат въведение в услугата с основни функции.",
        Getnow: "Вземете сега",
        ChefsSelection: "Изборът на главния готвач",
        Messages25Meals: "1500 съобщения + 25 ястия",
        p2descr:
          "Най-подходящ за редовни потребители, които търсят баланс между съобщения и опции за хранене.",
        GourmetsDelight: "Гурме наслада",
        Messages50Meals: "3500 съобщения + 50 ястия",
        p3descr:
          "Перфектен за редовни потребители, които искат повече съобщения и ястия на страхотна стойност.",
        Exploreoursubscriptionplan: "Разгледайте нашия абонаментен план:",
        Hotoffer: "Гореща оферта",
        Unlimitedmessages: "Неограничени съобщения",
        Unlimitedchats: "Неограничени чатове",
        Meals: "30 хранения",
        Customizabledietaryoptions: "Персонализируеми диетични опции",
        Freecancellation: "Безплатно анулиране",
        Subscribe: "Абонирайте се",
        month: "14,99 евро/месец",
        Yourubscription: "Вашият абонаментен план:",
        Premium: "Премиум",
        eamonth: "€ на месец",
        Createdon: "Създаден на",
        Yoursubscriptionhasbeen: "Вашият абонамент е анулиран и ще изтече на",
        Yournextchargewillbeon: "Следващото ви таксуване ще бъде включено",
        Cancelled: "Отменено",
        CancelSubscription: "Отказ от абонамент",
        Areyousureyouwant:
          "Сигурни ли сте, че искате да анулирате абонамента си?",
        No: "Не",
        Yes: "Да",
        Cancelling: "Отменя се...",
        Cancel: "Отказ",
      },
    },
    de: {
      translation: {
        chatwarn: "Meal Master kann gelegentlich Fehler machen.",
        lnt: "Sprache und Design",
        LightTheme: "Hell",
        DarkTheme: "Dunkel",
        SunnyTheme: "Sonniges Licht",
        CoolTheme: "Kühles Licht",
        WarmTheme: "Warm-Dunkel",
        SaveChanges: "Einstellungen speichern",
        FoodPreferences: "Lebensmitteleinstellungen",
        None: "Keine",
        Vegetarian: "Vegetarisch",
        Vegan: "Vegan",
        Allergens: "Allergene",
        NoAdded: "Keine hinzugefügt",
        AddAllergen: "Allergen hinzufügen",
        DislikedFoods: "Unbeliebte Lebensmittel",
        AddFood: "Lebensmittel hinzufügen",
        GeneratingMeal: "Mahlzeit generieren",
        GenerateMeal: "Mahlzeit generieren",
        GetPremium: "Marktplatz",
        MyMeals: "Meine Mahlzeiten",
        LoadMore: "Mehr laden...",
        NoRecipes: "Sie haben keine Rezepte",
        Loading: "Wird geladen",
        YourSubscription: "Ihr Abonnement",
        Dashboard: "Dashboard",
        NoChats: "Sie haben keine Chats",
        RulesNPolicies: "Regeln und Richtlinien",
        Settings: "Einstellungen",
        Subscription: "Abonnement",
        SignOut: "Abmelden",
        Upload: "Hochladen",
        CopyUserId: "Benutzer-ID kopieren",
        Profile: "Profil",
        WhatToCook: "Was möchten Sie heute kochen?",
        LookingForFav: "Suchen Sie nach Ihrem Lieblingsessen?",
        AddAllergens: "Fügen Sie Ihre Allergene hinzu",
        AddDisliked: "Fügen Sie Ihre unbeliebten Lebensmittel hinzu",
        Warning: "Warnung",
        YouHave: "Sie haben",
        MessagesLeft: "Nachrichten übrig",
        FileError:
          "Bitte wählen Sie eine gültige Bilddatei aus. Unterstützte Typen: JPEG, PNG, WEBP",
        ImageLimitError:
          "Maximale Bildgröße überschritten. Bitte wählen Sie ein Bild unter 2 MB aus.",
        Ingredients: "Zutaten",
        PreparationSteps: "Zubereitungsschritte",
        TastersChoice: "Taster’s Choice",
        Messages10Meals: "700 Nachrichten + 10 Mahlzeiten",
        p1descr:
          "Ideal für Gelegenheitsnutzer, die eine Einführung in den Service mit den wichtigsten Funktionen wünschen.",
        Getnow: "Jetzt holen",
        ChefsSelection: "Chef’s Selection",
        Messages25Meals: "1.500 Nachrichten + 25 Mahlzeiten",
        p2descr:
          "Am besten geeignet für regelmäßige Benutzer, die ein Gleichgewicht zwischen Nachrichten und Mahlzeitenoptionen suchen.",
        GourmetsDelight: "Gourmet’s Delight",
        Messages50Meals: "3.500 Nachrichten + 50 Mahlzeiten",
        p3descr:
          "Perfekt für Vielnutzer, die mehr Nachrichten und Mahlzeiten zu einem guten Preis möchten.",
        Exploreoursubscriptionplan: "Entdecken Sie unseren Abonnementplan:",
        Hotoffer: "Heißes Angebot",
        Unlimitedmessages: "Unbegrenzte Nachrichten",
        Unlimitedchats: "Unbegrenzte Chats",
        Meals: "30 Mahlzeiten",
        Customizabledietaryoptions: "Anpassbare Ernährungsoptionen",
        Freecancellation: "Kostenlose Kündigung",
        Subscribe: "Abonnieren",
        month: "14,99 €/Monat",
        Yourubscription: "Ihr Abonnementplan:",
        Premium: "Premium",
        eamonth: "€ pro Monat",
        Createdon: "Erstellt am",
        Yoursubscriptionhasbeen:
          "Ihr Abonnement wurde gekündigt und läuft ab am",
        Yournextchargewillbeon: "Ihre nächste Belastung erfolgt am",
        Cancelled: "Gekündigt",
        CancelSubscription: "Abonnement kündigen",
        Areyousureyouwant: "Möchten Sie Ihr Abonnement wirklich kündigen?",
        No: "Nein",
        Yes: "Ja",
        Cancelling: "Kündigung...",
        Cancel: "Kündigen",
      },
    },
    fr: {
      translation: {
        chatwarn: "Meal Master peut parfois faire des erreurs.",
        lnt: "Langue et thème",
        LightTheme: "Clair",
        DarkTheme: "Sombre",
        SunnyTheme: "Lumière ensoleillée",
        CoolTheme: "Lumière froide",
        WarmTheme: "Chaud Sombre",
        SaveChanges: "Enregistrer les préférences",
        FoodPreferences: "Préférences alimentaires",
        None: "Aucune",
        Vegetarian: "Végétarien",
        Vegan: "Végétalien",
        Allergens: "Allergènes",
        NoAdded: "Aucun ajouté",
        AddAllergen: "Ajouter un allergène",
        DislikedFoods: "Aliments détestés",
        AddFood: "Ajouter un aliment",
        GeneratingMeal: "Génération de repas",
        GenerateMeal: "Générer un repas",
        GetPremium: "Place de marché",
        MyMeals: "Mes repas",
        LoadMore: "Charger plus...",
        NoRecipes: "Vous n'avez aucune recette",
        Loading: "Chargement",
        YourSubscription: "Votre abonnement",
        Dashboard: "Tableau de bord",
        NoChats: "Vous n'avez aucune discussion",
        RulesNPolicies: "Règles et politiques",
        Settings: "Paramètres",
        Subscription: "Abonnement",
        SignOut: "Se déconnecter",
        Upload: "Télécharger",
        CopyUserId: "Copier l'identifiant utilisateur",
        Profile: "Profil",
        WhatToCook: "Que voulez-vous cuisiner aujourd'hui ?",
        LookingForFav: "Vous cherchez votre plat préféré ?",
        AddAllergens: "Ajoutez vos allergènes",
        AddDisliked: "Ajoutez vos aliments détestés",
        Warning: "Avertissement",
        YouHave: "vous avez",
        MessagesLeft: "des messages restants",
        FileError:
          "Veuillez sélectionner un fichier image valide. Types pris en charge : JPEG, PNG, WEBP",
        ImageLimitError:
          "Taille d'image maximale dépassée. Veuillez sélectionner une image inférieure à 2 Mo.",
        Ingredients: "Ingrédients",
        PreparationSteps: "Étapes de préparation",
        TastersChoice: "Choix du dégustateur",
        Messages10Meals: "700 messages + 10 repas",
        p1descr:
          "Idéal pour les utilisateurs occasionnels qui souhaitent une introduction au service avec des fonctionnalités essentielles.",
        Getnow: "Obtenir maintenant",
        ChefsSelection: "Sélection du chef",
        Messages25Meals: "1 500 messages + 25 repas",
        p2descr:
          "Idéal pour les utilisateurs réguliers qui recherchent un équilibre entre les messages et les options de repas.",
        GourmetsDelight: "Délice du gourmet",
        Messages50Meals: "3 500 messages + 50 repas",
        p3descr:
          "Parfait pour les utilisateurs fréquents qui veulent plus de messages et de repas à un prix avantageux.",
        Exploreoursubscriptionplan: "Découvrez notre formule d'abonnement :",
        Hotoffer: "Offre exceptionnelle",
        Unlimitedmessages: "Messages illimités",
        Unlimitedchats: "Chats illimités",
        Meals: "30 repas",
        Customizabledietaryoptions: "Options diététiques personnalisables",
        Freecancellation: "Annulation gratuite",
        Subscribe: "S'abonner",
        month: "14,99 €/mois",
        Yourubscription: "Votre formule d'abonnement :",
        Premium: "Premium",
        eamonth: "€ par mois",
        Createdon: "Créé le",
        Yoursubscriptionhasbeen: "Votre abonnement a été annulé et expirera le",
        Yournextchargewillbeon: "Votre prochain prélèvement aura lieu le",
        Cancelled: "Annulé",
        CancelSubscription: "Annuler l'abonnement",
        Areyousureyouwant:
          "Êtes-vous sûr de vouloir annuler votre abonnement ?",
        No: "Non",
        Yes: "Oui",
        Cancelling: "Annulation en cours...",
        Cancel: "Annuler",
      },
    },
    it: {
      translation: {
        chatwarn: "Meal Master potrebbe occasionalmente commettere errori.",
        lnt: "Lingua e tema",
        LightTheme: "Chiaro",
        DarkTheme: "Scuro",
        SunnyTheme: "Soleggiato Chiaro",
        CoolTheme: "Freddo Chiaro",
        WarmTheme: "Caldo Scuro",
        SaveChanges: "Salva preferenze",
        FoodPreferences: "Preferenze alimentari",
        None: "Nessuno",
        Vegetarian: "Vegetariano",
        Vegan: "Vegano",
        Allergens: "Allergeni",
        NoAdded: "Nessuno aggiunto",
        AddAllergen: "Aggiungi allergene",
        DislikedFoods: "Cibi non graditi",
        AddFood: "Aggiungi alimento",
        GeneratingMeal: "Generazione pasto",
        GenerateMeal: "Genera pasto",
        GetPremium: "Marketplace",
        MyMeals: "I miei pasti",
        LoadMore: "Carica altro...",
        NoRecipes: "Non hai ricette",
        Loading: "Caricamento",
        YourSubscription: "Il tuo abbonamento",
        Dashboard: "Dashboard",
        NoChats: "Non hai chat",
        RulesNPolicies: "Regole e politiche",
        Settings: "Impostazioni",
        Subscription: "Abbonamento",
        SignOut: "Esci",
        Upload: "Carica",
        CopyUserId: "Copia ID utente",
        Profile: "Profilo",
        WhatToCook: "Cosa vuoi cucinare oggi?",
        LookingForFav: "Cerchi il tuo pasto preferito?",
        AddAllergens: "Aggiungi i tuoi allergeni",
        AddDisliked: "Aggiungi i tuoi cibi non graditi",
        Warning: "Attenzione",
        YouHave: "hai",
        MessagesLeft: "messaggi rimasti",
        FileError:
          "Seleziona un file immagine valido. Tipi supportati: JPEG, PNG, WEBP",
        ImageLimitError:
          "Dimensione massima dell'immagine superata. Seleziona un'immagine inferiore a 2 MB.",
        Ingredients: "Ingredienti",
        PreparationSteps: "Fasi di preparazione",
        TastersChoice: "Scelta del degustatore",
        Messages10Meals: "700 messaggi + 10 pasti",
        p1descr:
          "Ideale per utenti leggeri che desiderano un'introduzione al servizio con funzionalità essenziali.",
        Getnow: "Ottieni ora",
        ChefsSelection: "Selezione dello chef",
        Messages25Meals: "1.500 messaggi + 25 pasti",
        p2descr:
          "Più adatto per utenti regolari che cercano un equilibrio tra messaggi e opzioni pasto.",
        GourmetsDelight: "Delizia del gourmet",
        Messages50Meals: "3.500 messaggi + 50 pasti",
        p3descr:
          "Perfetto per utenti frequenti che desiderano più messaggi e pasti a un ottimo prezzo.",
        Exploreoursubscriptionplan: "Esplora il nostro piano di abbonamento:",
        Hotoffer: "Offerta speciale",
        Unlimitedmessages: "Messaggi illimitati",
        Unlimitedchats: "Chat illimitate",
        Meals: "30 pasti",
        Customizabledietaryoptions: "Opzioni dietetiche personalizzabili",
        Freecancellation: "Annullamento gratuito",
        Subscribe: "Iscriviti",
        month: "€ 14,99/mese",
        Yourubscription: "Il tuo piano di abbonamento:",
        Premium: "Premium",
        eamonth: "€ al mese",
        Createdon: "Creato il",
        Yoursubscriptionhasbeen:
          "Il tuo abbonamento è stato annullato e scadrà il",
        Yournextchargewillbeon: "Il tuo prossimo addebito sarà il",
        Cancelled: "Annullato",
        CancelSubscription: "Annulla abbonamento",
        Areyousureyouwant: "Sei sicuro di voler annullare l'abbonamento?",
        No: "No",
        Yes: "Sì",
        Cancelling: "Annullamento in corso...",
        Cancel: "Annulla",
      },
    },
    es: {
      translation: {
        chatwarn: "Meal Master puede cometer errores ocasionalmente.",
        lnt: "Idioma y tema",
        LightTheme: "Claro",
        DarkTheme: "Oscuro",
        SunnyTheme: "Claro soleado",
        CoolTheme: "Claro frío",
        WarmTheme: "Cálido oscuro",
        SaveChanges: "Guardar preferencias",
        FoodPreferences: "Preferencias de comida",
        None: "Ninguno",
        Vegetarian: "Vegetariano",
        Vegan: "Vegano",
        Allergens: "Alérgenos",
        NoAdded: "Ninguno añadido",
        AddAllergen: "Añadir alérgeno",
        DislikedFoods: "Alimentos no deseados",
        AddFood: "Añadir alimento",
        GeneratingMeal: "Generando comida",
        GenerateMeal: "Generar comida",
        GetPremium: "Mercado",
        MyMeals: "Mis comidas",
        LoadMore: "Cargar más...",
        NoRecipes: "No tienes ninguna receta",
        Loading: "Cargando",
        YourSubscription: "Tu suscripción",
        Dashboard: "Panel de control",
        NoChats: "No tienes ningún chat",
        RulesNPolicies: "Reglas y políticas",
        Settings: "Configuración",
        Subscription: "Suscripción",
        SignOut: "Cerrar sesión",
        Upload: "Subir",
        CopyUserId: "Copiar Id. de usuario",
        Profile: "Perfil",
        WhatToCook: "¿Qué quieres cocinar hoy?",
        LookingForFav: "¿Buscas tu comida favorita?",
        AddAllergens: "Añade tus alérgenos",
        AddDisliked: "Añade tus alimentos no deseados",
        Warning: "Advertencia",
        YouHave: "te quedan",
        MessagesLeft: "mensajes",
        FileError: "Selecciona un archivo de imagen válido. Tipos admitidos: JPEG, PNG, WEBP",
        ImageLimitError: "Se ha excedido el tamaño máximo de imagen. Selecciona una imagen de menos de 2 MB.",
        Ingredients: "Ingredientes",
        PreparationSteps: "Pasos de preparación",
        TastersChoice: "Selección del degustador",
        Messages10Meals: "700 mensajes + 10 comidas",
        p1descr: "Ideal para usuarios ocasionales que desean una introducción al servicio con funciones esenciales.",
        Getnow: "Obtener ahora",
        ChefsSelection: "Selección del chef",
        Messages25Meals: "1500 mensajes + 25 comidas",
        p2descr: "Ideal para usuarios habituales que buscan un equilibrio entre mensajes y opciones de comidas.",
        GourmetsDelight: "Delicia del gourmet",
        Messages50Meals: "3500 mensajes + 50 comidas",
        p3descr: "Perfecto para usuarios frecuentes que desean más mensajes y comidas a un precio excelente.",
        Exploreoursubscriptionplan: "Explora nuestro plan de suscripción:",
        Hotoffer: "Oferta especial",
        Unlimitedmessages: "Mensajes ilimitados",
        Unlimitedchats: "Chats ilimitados",
        Meals: "30 comidas",
        Customizabledietaryoptions: "Opciones dietéticas personalizables",
        Freecancellation: "Cancelación gratuita",
        Subscribe: "Suscríbete",
        month: "14,99 €/mes",
        Yourubscription: "Tu plan de suscripción:",
        Premium: "Premium",
        eamonth: "€ al mes",
        Createdon: "Creado el",
        Yoursubscriptionhasbeen: "Tu suscripción ha sido cancelada y caducará el",
        Yournextchargewillbeon: "Tu próximo cargo será el",
        Cancelled: "Cancelado",
        CancelSubscription: "Cancelar suscripción",
        Areyousureyouwant: "¿Estás seguro de que quieres cancelar tu suscripción?",
        No: "No",
        Yes: "Sí",
        Cancelling: "Cancelando...",
        Cancel: "Cancelar",        
      },
    },
    pt: {
      translation: {
        chatwarn: "O Meal Master pode ocasionalmente cometer erros.",
        lnt: "Língua e tema",
        LightTheme: "Luz",
        DarkTheme: "Escuro",
        SunnyTheme: "Luz Sunny",
        CoolTheme: "Luz agradável",
        WarmTheme: "Escuro quente",
        SaveChanges: "Guardar preferências",
        FoodPreferences: "Preferências alimentares",
        None: "Nenhum",
        Vegetarian: "Vegetariano",
        Vegan: "Vegan",
        Allergens: "Alergénios",
        NoAdded: "Nenhum adicionado",
        AddAllergen: "Adicionar Alergénio",
        DislikedFoods: "Alimentos sem gosto",
        AddFood: "Adicionar comida",
        GeneratingMeal: "Refeição de geração",
        GenerateMeal: "Gerar refeição",
        GetPremium: "Mercado",
        MyMeals: "As minhas refeições",
        LoadMore: "Carregue mais...",
        NoRecipes: "Não tem receitas",
        Loading: "Carregando",
        YourSubscription: "A sua subscrição",
        Dashboard: "Dashboard",
        NoChats: "Não tem chat",
        RulesNPolicies: "Regras e Políticas",
        Settings: "Configurações",
        Subscription: "Subscrição",
        SignOut: "Inscreva-se",
        Upload: "Upload",
        CopyUserId: "Copiar ID do utilizador",
        Profile: "Perfil",
        WhatToCook: "O que quer cozinhar hoje?",
        LookingForFav: "Procura a sua refeição favorita?",
        AddAllergens: "Adicione os seus alergénios",
        AddDisliked: "Adicione os seus alimentos não gostados",
        Warning: "Aviso",
        YouHave: "tem",
        MessagesLeft: "mensagens deixadas",
        FileError: "Selecione um ficheiro de imagem válido. Tipos suportados: JPEG, PNG, WEBP",
        ImageLimitError: "Tamanho máximo da imagem excedido. Selecione uma imagem abaixo de 2 MB.",
        Ingredients: "Ingredientes",
        PreparationSteps: "Etapas de preparação",
        TastersChoice: "Escolha de provador",
        Messages10Meals: "700 Mensagens + 10 Refeições",
        p1descr: "Ideal para utilizadores leves que desejam uma introdução ao serviço com características essenciais.",
        Getnow: "Obtenha agora",
        ChefsSelection: "Seleção do Chef",
        Messages25Meals: "1.500 Mensagens + 25 Refeições",
        p2descr: "É mais adequado para utilizadores regulares que procuram um equilíbrio entre mensagens e opções de refeição.",
        GourmetsDelight: "O deleite de Gourmet",
        Messages50Meals: "3.500 Mensagens + 50 Refeições",
        p3descr: "Perfeito para utilizadores frequentes que desejam mais mensagens e refeições com um grande valor.",
        Exploreoursubscriptionplan: "Explore o nosso plano de subscrição:",
        Hotoffer: "Oferta quente",
        Unlimitedmessages: "Mensagens ilimitadas",
        Unlimitedchats: "Chats ilimitados",
        Meals: "30 Refeições",
        Customizabledietaryoptions: "Opções dietéticas personalizáveis",
        Freecancellation: "Cancelamento gratuito",
        Subscribe: "Subscreva",
        month: "14,99€/mês",
        Yourubscription: "O seu plano de subscrição:",
        Premium: "Prémio",
        eamonth: "€ por mês",
        Createdon: "Criado em",
        Yoursubscriptionhasbeen: "A sua subscrição foi cancelada e vai expirar em",
        Yournextchargewillbeon: "A sua próxima cobrança estará ligada",
        Cancelled: "Cancelado",
        CancelSubscription: "Subscrição de cancelamento",
        Areyousureyouwant: "Tem a certeza que quer cancelar a sua subscrição?",
        No: "Não",
        Yes: "Sim",
        Cancelling: "Cancelamento...",
        Cancel: "Cancelar",        
      },
    },
  },
});

export default i18n;
