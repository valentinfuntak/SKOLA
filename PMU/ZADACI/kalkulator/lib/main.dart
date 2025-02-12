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

// HOMEPAGE (PRIJAVA)
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Prijava'), centerTitle: true),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('Unesite ime i prezime:',
                  style: TextStyle(fontSize: 18)),
              TextFormField(
                controller: nameController,
                decoration:
                    const InputDecoration(hintText: 'Unesite ime i prezime'),
                validator: (value) =>
                    value == null || value.isEmpty ? 'Unesite ime!' : null,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    Navigator.pushReplacementNamed(context, '/calculator',
                        arguments: nameController.text);
                  }
                },
                child: const Text('Prijavi se'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// KALKULATOR
class CalculatorPage extends StatefulWidget {
  const CalculatorPage({super.key});

  @override
  _CalculatorPageState createState() => _CalculatorPageState();
}

class _CalculatorPageState extends State<CalculatorPage> {
  final _formKey1 = GlobalKey<FormState>();
  final _formKey2 = GlobalKey<FormState>();
  final _formKey3 = GlobalKey<FormState>();

  final TextEditingController postotakController = TextEditingController();
  final TextEditingController brojController = TextEditingController();
  final TextEditingController dioController = TextEditingController();
  final TextEditingController ukupnoController = TextEditingController();
  final TextEditingController pocetnaVrijednostController =
      TextEditingController();
  final TextEditingController krajnjaVrijednostController =
      TextEditingController();

  double? rezultat1, rezultat2, rezultat3;

  @override
  Widget build(BuildContext context) {
    final String userName =
        ModalRoute.of(context)!.settings.arguments as String;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Kalkulator Postotka'),
        actions: [
          ElevatedButton.icon(
            onPressed: () => Navigator.pushReplacementNamed(context, '/'),
            icon: const Icon(Icons.logout),
            label: const Text('Odjavi se'),
            style: ElevatedButton.styleFrom(
                foregroundColor: Colors.white, backgroundColor: Colors.red),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text('Dobrodošli, $userName!',
                style: const TextStyle(fontSize: 24)),
            const SizedBox(height: 20),
            forma(
              "Koliko je",
              postotakController,
              brojController,
              _formKey1,
              "IZRAČUNAJ",
              () {
                if (_formKey1.currentState!.validate()) {
                  setState(() {
                    double postotak = double.parse(postotakController.text);
                    double ukupno = double.parse(brojController.text);
                    rezultat1 = (postotak / 100) * ukupno;
                  });
                }
              },
              rezultat1,
            ),
            const SizedBox(height: 16),
            forma(
              "Koliki postotak je",
              dioController,
              ukupnoController,
              _formKey2,
              "IZRAČUNAJ",
              () {
                if (_formKey2.currentState!.validate()) {
                  setState(() {
                    double dio = double.parse(dioController.text);
                    double ukupno = double.parse(ukupnoController.text);
                    rezultat2 = (dio / ukupno) * 100;
                  });
                }
              },
              rezultat2,
              isPercentage: true,
            ),
            const SizedBox(height: 16),
            forma(
              "Koji je postotak povećanja/smanjenja od",
              pocetnaVrijednostController,
              krajnjaVrijednostController,
              _formKey3,
              "IZRAČUNAJ",
              () {
                if (_formKey3.currentState!.validate()) {
                  setState(() {
                    double pocetna =
                        double.parse(pocetnaVrijednostController.text);
                    double krajnja =
                        double.parse(krajnjaVrijednostController.text);
                    rezultat3 = ((krajnja - pocetna) / pocetna) * 100;
                  });
                }
              },
              rezultat3,
              isPercentage: true,
              promjena: true,
            ),
          ],
        ),
      ),
    );
  }

  //TAMEPLATE ZA FORMU
  Widget forma(
    String label,
    TextEditingController controller1,
    TextEditingController controller2,
    GlobalKey<FormState> formKey,
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
        child: Form(
          key: formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(label),
                  const SizedBox(width: 8),
                  Expanded(
                    child: TextFormField(
                      controller: controller1,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        hintText: 'Unesite broj',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) => value == null ||
                              value.isEmpty ||
                              double.tryParse(value) == null
                          ? 'Unesite brojčanu vrijednost'
                          : null,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(promjena ? "na" : (isPercentage ? "od" : "% od")),
                  const SizedBox(width: 8),
                  Expanded(
                    child: TextFormField(
                      controller: controller2,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        hintText: 'Unesite broj',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) => value == null ||
                              value.isEmpty ||
                              double.tryParse(value) == null
                          ? 'Unesite brojčanu vrijednost'
                          : null,
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
                      onPressed: onCalculate, child: Text(buttonText)),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                    decoration: BoxDecoration(
                        color: Colors.grey[300],
                        borderRadius: BorderRadius.circular(8)),
                    child: Text(
                      result != null
                          ? "${result.toStringAsFixed(2)}${isPercentage ? '%' : ''}"
                          : '0',
                      style: const TextStyle(fontSize: 18),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
