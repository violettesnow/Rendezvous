import React, { useState } from 'react';
import { Heart, MapPin, Calendar, DollarSign, Plane, TrendingUp, ArrowRight, Check, X, Sparkles } from 'lucide-react';

export default function Rendezvous() {
  const [step, setStep] = useState('welcome'); // welcome, setup, results, breakdown
  const [traveler1City, setTraveler1City] = useState('');
  const [traveler2City, setTraveler2City] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priorities, setPriorities] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const priorityOptions = [
    { id: 'food', label: 'Food & Restaurants', icon: '🍽️' },
    { id: 'accommodation', label: 'Accommodation Quality', icon: '🏨' },
    { id: 'activities', label: 'Activities & Experiences', icon: '🎭' },
    { id: 'nightlife', label: 'Nightlife & Entertainment', icon: '🎉' },
    { id: 'nature', label: 'Nature & Outdoors', icon: '🏔️' },
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' }
  ];

  const togglePriority = (id) => {
    if (priorities.includes(id)) {
      setPriorities(priorities.filter(p => p !== id));
    } else if (priorities.length < 3) {
      setPriorities([...priorities, id]);
    }
  };

  const calculateTripDays = () => {
    if (!startDate || !endDate) return 7;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 7;
  };

  const generateDestinations = () => {
    const days = calculateTripDays();
    const budgetNum = parseFloat(budget) || 2000;
    
    const destinations = [
      {
        id: 1,
        city: 'Lisbon',
        country: 'Portugal',
        matchScore: 95,
        totalCost: budgetNum * 0.85,
        flight1Cost: 450,
        flight2Cost: 520,
        highlight: 'Vibrant food scene, affordable charm',
        image: '🇵🇹',
        breakdown: {
          accommodation: budgetNum * 0.35,
          food: budgetNum * 0.30,
          activities: budgetNum * 0.25,
          transport: budgetNum * 0.10
        }
      },
      {
        id: 2,
        city: 'Mexico City',
        country: 'Mexico',
        matchScore: 92,
        totalCost: budgetNum * 0.75,
        flight1Cost: 380,
        flight2Cost: 420,
        highlight: 'Rich culture, incredible food, great value',
        image: '🇲🇽',
        breakdown: {
          accommodation: budgetNum * 0.30,
          food: budgetNum * 0.25,
          activities: budgetNum * 0.30,
          transport: budgetNum * 0.15
        }
      },
      {
        id: 3,
        city: 'Budapest',
        country: 'Hungary',
        matchScore: 89,
        totalCost: budgetNum * 0.80,
        flight1Cost: 490,
        flight2Cost: 510,
        highlight: 'Thermal baths, stunning architecture, affordable',
        image: '🇭🇺',
        breakdown: {
          accommodation: budgetNum * 0.32,
          food: budgetNum * 0.28,
          activities: budgetNum * 0.28,
          transport: budgetNum * 0.12
        }
      },
      {
        id: 4,
        city: 'Bali',
        country: 'Indonesia',
        matchScore: 88,
        totalCost: budgetNum * 0.70,
        flight1Cost: 650,
        flight2Cost: 580,
        highlight: 'Tropical paradise, wellness & adventure',
        image: '🇮🇩',
        breakdown: {
          accommodation: budgetNum * 0.28,
          food: budgetNum * 0.22,
          activities: budgetNum * 0.35,
          transport: budgetNum * 0.15
        }
      },
      {
        id: 5,
        city: 'Prague',
        country: 'Czech Republic',
        matchScore: 86,
        totalCost: budgetNum * 0.82,
        flight1Cost: 470,
        flight2Cost: 495,
        highlight: 'Fairy-tale charm, great beer, walkable',
        image: '🇨🇿',
        breakdown: {
          accommodation: budgetNum * 0.33,
          food: budgetNum * 0.27,
          activities: budgetNum * 0.27,
          transport: budgetNum * 0.13
        }
      }
    ];

    return destinations;
  };

  const destinations = step === 'results' ? generateDestinations() : [];

  const handleSetup = () => {
    if (traveler1City && traveler2City && budget && startDate && endDate && priorities.length === 3) {
      setStep('results');
    }
  };

  const selectDestination = (dest) => {
    setSelectedDestination(dest);
    setStep('breakdown');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const generateSmartSuggestions = () => {
    if (!selectedDestination) return [];
    const budgetNum = parseFloat(budget);
    const overage = selectedDestination.totalCost - budgetNum;
    
    if (overage <= 0) return [];

    return [
      {
        action: 'Switch to Airbnb instead of hotel',
        savings: budgetNum * 0.15,
        impact: 'More local experience, kitchen access'
      },
      {
        action: 'Cook 3 meals at accommodation',
        savings: budgetNum * 0.08,
        impact: 'Save on dining, fun to shop local markets'
      },
      {
        action: 'Choose free walking tours',
        savings: budgetNum * 0.06,
        impact: 'Meet other travelers, authentic insights'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rendezvous</h1>
              <p className="text-xs text-gray-500">Meet somewhere new</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Free</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Screen */}
        {step === 'welcome' && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="text-8xl mb-6">✈️❤️🗺️</div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Meet Somewhere Magical
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Two travelers. One budget. Infinite possibilities.<br/>
                Find your perfect destination and stay on track.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What's Included (Free):</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Smart Destination Matching</div>
                    <div className="text-sm text-gray-600">Based on your budget & priorities</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Budget Breakdown</div>
                    <div className="text-sm text-gray-600">See where your money goes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Smart Trade-offs</div>
                    <div className="text-sm text-gray-600">Stay on budget with suggestions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Priority Matching</div>
                    <div className="text-sm text-gray-600">Find places you'll both love</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-2xl p-6 border border-rose-200 mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span className="font-bold text-gray-900">Coming Soon: Premium</span>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✈️ Flight price tracking & booking</div>
                <div>🌤️ Weather forecasts & best times to visit</div>
                <div>📱 Real-time budget tracking during trip</div>
                <div>🎯 Dart throw game & more</div>
              </div>
            </div>

            <button
              onClick={() => setStep('setup')}
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-12 py-4 rounded-full text-lg font-bold shadow-lg transition-all transform hover:scale-105"
            >
              Start Planning Your Rendezvous
            </button>
          </div>
        )}

        {/* Setup Screen */}
        {step === 'setup' && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Plan Your Meeting</h2>
              <p className="text-gray-600">Tell us about your trip and we'll find the perfect destination</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 space-y-6">
              {/* Cities */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Traveler 1 Flying From
                  </label>
                  <input
                    type="text"
                    value={traveler1City}
                    onChange={(e) => setTraveler1City(e.target.value)}
                    placeholder="e.g., New York"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Traveler 2 Flying From
                  </label>
                  <input
                    type="text"
                    value={traveler2City}
                    onChange={(e) => setTraveler2City(e.target.value)}
                    placeholder="e.g., London"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Total Budget (excluding flights)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="2000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">This covers accommodation, food, activities, and local transport for both travelers</p>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Priorities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Select Your Top 3 Priorities
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {priorityOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => togglePriority(option.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        priorities.includes(option.id)
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{option.icon}</span>
                          <span className="font-medium text-gray-900">{option.label}</span>
                        </div>
                        {priorities.includes(option.id) && (
                          <Check className="w-5 h-5 text-rose-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{priorities.length}/3 selected</p>
              </div>

              <button
                onClick={handleSetup}
                disabled={!traveler1City || !traveler2City || !budget || !startDate || !endDate || priorities.length !== 3}
                className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
              >
                Find Destinations
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {step === 'results' && (
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Perfect Destinations for You</h2>
              <p className="text-gray-600">Based on your budget of {formatCurrency(parseFloat(budget))} and priorities</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {destinations.map(dest => (
                <div key={dest.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-4xl mb-2">{dest.image}</div>
                        <h3 className="text-2xl font-bold text-gray-900">{dest.city}</h3>
                        <p className="text-gray-600">{dest.country}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold mb-2">
                          {dest.matchScore}% Match
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 italic">{dest.highlight}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Estimated Budget:</span>
                        <span className="font-bold text-gray-900">{formatCurrency(dest.totalCost)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Flight from {traveler1City}:</span>
                        <span className="font-medium text-gray-700">{formatCurrency(dest.flight1Cost)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Flight from {traveler2City}:</span>
                        <span className="font-medium text-gray-700">{formatCurrency(dest.flight2Cost)}</span>
                      </div>
                    </div>

                    {dest.totalCost <= parseFloat(budget) && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-700 font-medium">✓ Within your budget!</p>
                      </div>
                    )}

                    <button
                      onClick={() => selectDestination(dest)}
                      className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white py-3 rounded-lg font-bold transition-all"
                    >
                      View Budget Breakdown
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Breakdown Screen */}
        {step === 'breakdown' && selectedDestination && (
          <div>
            <button
              onClick={() => setStep('results')}
              className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
            >
              ← Back to destinations
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-5xl">{selectedDestination.image}</span>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">{selectedDestination.city}, {selectedDestination.country}</h2>
                  <p className="text-gray-600">{selectedDestination.highlight}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Your Budget</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(parseFloat(budget))}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(selectedDestination.totalCost)}</div>
              </div>
              <div className={`rounded-xl p-6 shadow-lg border ${selectedDestination.totalCost <= parseFloat(budget) ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="text-sm text-gray-600 mb-1">Difference</div>
                <div className={`text-3xl font-bold ${selectedDestination.totalCost <= parseFloat(budget) ? 'text-green-600' : 'text-orange-600'}`}>
                  {selectedDestination.totalCost <= parseFloat(budget) ? '-' : '+'}{formatCurrency(Math.abs(selectedDestination.totalCost - parseFloat(budget)))}
                </div>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Budget Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(selectedDestination.breakdown).map(([category, amount]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900 capitalize">{category}</span>
                      <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-rose-500 to-orange-500 h-3 rounded-full"
                        style={{ width: `${(amount / selectedDestination.totalCost) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round((amount / selectedDestination.totalCost) * 100)}% of budget
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Suggestions */}
            {selectedDestination.totalCost > parseFloat(budget) && (
              <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Smart Trade-offs to Stay on Budget</h3>
                <p className="text-gray-700 mb-6">You're about {formatCurrency(selectedDestination.totalCost - parseFloat(budget))} over budget. Here are some ways to adjust:</p>
                <div className="space-y-4">
                  {generateSmartSuggestions().map((suggestion, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-bold text-gray-900">{suggestion.action}</div>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          Save {formatCurrency(suggestion.savings)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{suggestion.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedDestination.totalCost <= parseFloat(budget) && (
              <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're On Budget!</h3>
                <p className="text-gray-700">
                  You have {formatCurrency(parseFloat(budget) - selectedDestination.totalCost)} to spare for spontaneous adventures or upgrades!
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-gray-600">
          <p>Made with ❤️ for travelers who meet in the middle</p>
          <p className="mt-2">Premium features coming soon: Flight tracking, weather, real-time budgeting & more</p>
        </div>
      </footer>
    </div>
  );
}