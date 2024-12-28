import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KALKULATOR POSTOTKA',
      initialRoute: '/',
      routes: {
        '/': (context) => const HomePage(),
        '/calculator': (context) => const CalculatorPage(),
      },
    );
  }
}

//HOMEPAGE (PRIJAVA)
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Prijava'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Unesite ime i prezime:',
              style: TextStyle(fontSize: 18),
            ),
            TextField(
              controller: nameController,
              decoration: const InputDecoration(hintText: 'Ime i prezime'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                if (nameController.text.isNotEmpty) {
                  Navigator.pushReplacementNamed(context, '/calculator',
                      arguments: nameController.text);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Molimo unesite ime!')),
                  );
                }
              },
              child: const Text('Prijavi se'),
            ),
          ],
        ),
      ),
    );
  }
}


//KALKULATOR
class CalculatorPage extends StatefulWidget {
  const CalculatorPage({super.key});

  @override
  _CalculatorPageState createState() => _CalculatorPageState();
}

class _CalculatorPageState extends State<CalculatorPage> {
  final TextEditingController postotakController = TextEditingController();
  final TextEditingController brojController = TextEditingController();
  final TextEditingController dioController = TextEditingController();
  final TextEditingController ukupnoController = TextEditingController();
  final TextEditingController pocetnaVrijednostController = TextEditingController();
  final TextEditingController krajnjaVrijednostController = TextEditingController();

  double? rezultat1;
  double? rezultat2;
  double? rezultat3;
  String? errorMessage;

  @override
  Widget build(BuildContext context) {
    final String userName =
        ModalRoute.of(context)!.settings.arguments as String;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Kalkulator Postotka'),
        actions: [
          ElevatedButton.icon(
            onPressed: () {
              Navigator.pushReplacementNamed(context, '/');
            },
            icon: const Icon(Icons.logout),
            label: const Text('Odjavi se'),
            style: ElevatedButton.styleFrom(
              foregroundColor: Colors.white, backgroundColor: Colors.red, // Boja teksta
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              'Dobrodošli, $userName!',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 20),
            forma(
              "Koliko je",
              postotakController,
              brojController,
              "IZRAČUNAJ",
              () {
                setState(() {
                  errorMessage = null;
                  try {
                    double postotak = double.parse(postotakController.text);
                    double ukupno = double.parse(brojController.text);
                    rezultat1 = (postotak / 100) * ukupno;
                  } catch (e) {
                    errorMessage = 'Unesite brojčane vrijednosti';
                  }
                });
              },
              rezultat1,
              isPercentage: false,
            ),
            const SizedBox(height: 16),
            forma(
              "Koliki postotak je",
              dioController,
              ukupnoController,
              "IZRAČUNAJ",
              () {
                setState(() {
                  errorMessage = null;
                  try {
                    double dio = double.parse(dioController.text);
                    double ukupno = double.parse(ukupnoController.text);
                    rezultat2 = (dio / ukupno) * 100;
                  } catch (e) {
                    errorMessage = 'Unesite brojčane vrijednosti';
                  }
                });
              },
              rezultat2,
              isPercentage: true,
            ),
            const SizedBox(height: 16),
            forma(
              "Koji je postotak povećanja/smanjenja od",
              pocetnaVrijednostController,
              krajnjaVrijednostController,
              "IZRAČUNAJ",
              () {
                setState(() {
                  errorMessage = null;
                  try {
                    double pocetna = double.parse(pocetnaVrijednostController.text);
                    double krajnja = double.parse(krajnjaVrijednostController.text);
                    rezultat3 = ((krajnja - pocetna) / pocetna) * 100;
                  } catch (e) {
                    errorMessage = 'Unesite brojčane vrijednosti';
                  }
                });
              },
              rezultat3,
              isPercentage: true,
              promjena: true,  // Dodajemo novi parametar za treću formu
            ),
            if (errorMessage != null) ...[
              const SizedBox(height: 16),
              Text(
                errorMessage!,
                style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            ],
          ],
        ),
      ),
    );
  }

  //FORME ZA SVAKI DIO KALKULATORA
  Widget forma(
    String label,
    TextEditingController controller1,
    TextEditingController controller2,
    String buttonText,
    VoidCallback onCalculate,
    double? result, {
    bool isPercentage = false,
    bool promjena = false,  
  }) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(label),
                const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    controller: controller1,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      hintText: '0',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text(promjena ? "na" : (isPercentage ? "od" : "% od")), // Promjena teksta
                const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    controller: controller2,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      hintText: '0',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                const Text("?"),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton(
                  onPressed: onCalculate,
                  child: Text(buttonText),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.grey[300],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    result != null
                        ? "${result.toStringAsFixed(2)}${isPercentage ? '%' : '.'}"
                        : '0',
                    style: const TextStyle(fontSize: 18),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
