import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sqflite/sqflite.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:sqflite_common_ffi_web/sqflite_ffi_web.dart';
import 'package:path/path.dart' as p;

void main() {
  if (kIsWeb) {
    databaseFactory = databaseFactoryFfiWeb;
  }
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
        '/history': (context) => const HistoryPage(),
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

  //INSTANCA BAZE ZA POVIJEST KONVERZIJA
  final ConversionDatabaseHelper _convDb = ConversionDatabaseHelper.instance;

  //FUNCKIJA ZA SPREMANJE POVIJESTI IZRAČUNA U BP
  Future<void> _saveConversion(
      String operation, String input, double result) async {
    final history = ConversionHistory(
      date: DateTime.now(),
      operation: operation,
      input: input,
      result: result,
    );
    await _convDb.insert(history);
  }

  @override
  Widget build(BuildContext context) {
    final String userName =
        ModalRoute.of(context)!.settings.arguments as String;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Kalkulator Postotka'),
        actions: [
          IconButton(
            icon: const Icon(Icons.history),
            tooltip: "Povijest konverzija",
            onPressed: () => Navigator.pushNamed(context, '/history'),
          ),
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
                  _saveConversion(
                      "Postotak od",
                      "${postotakController.text}% od ${brojController.text}",
                      rezultat1!);
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
                  _saveConversion(
                      "Dio u postotcima",
                      "${dioController.text} od ${ukupnoController.text}",
                      rezultat2!);
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
                  _saveConversion(
                      "Promjena vrijednosti",
                      "${pocetnaVrijednostController.text} na ${krajnjaVrijednostController.text}",
                      rezultat3!);
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

  // TEMPLATE ZA FORMU
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

// STRANICA ZA PRIKAZ POVIJESTI KONVERZIJA
class HistoryPage extends StatefulWidget {
  const HistoryPage({super.key});

  @override
  _HistoryPageState createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  final ConversionDatabaseHelper _convDb = ConversionDatabaseHelper.instance;
  late Future<List<ConversionHistory>> _historyFuture;

  @override
  void initState() {
    super.initState();
    _loadHistory();
  }

  void _loadHistory() {
    _historyFuture = _convDb.getAll();
  }

  Future<void> _deleteEntry(int id) async {
    await _convDb.delete(id);
    setState(() {
      _loadHistory();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Povijest Konverzija'),
      ),
      body: FutureBuilder<List<ConversionHistory>>(
        future: _historyFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Greška: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('Nema spremljenih konverzija.'));
          } else {
            final historyList = snapshot.data!;
            return ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: historyList.length,
              itemBuilder: (context, index) {
                final entry = historyList[index];
                return Card(
                  elevation: 4,
                  margin: const EdgeInsets.only(bottom: 16),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                  child: ListTile(
                    contentPadding: const EdgeInsets.all(16),
                    leading: CircleAvatar(
                      backgroundColor: Colors.blue.shade100,
                      child: const Icon(Icons.calculate, color: Colors.blue),
                    ),
                    title: Text(
                      entry.operation,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 8),
                        Text(
                          DateFormat.yMMMd().add_jm().format(entry.date),
                          style: const TextStyle(color: Colors.grey),
                        ),
                        const SizedBox(height: 4),
                        Text("Unos: ${entry.input}"),
                        const SizedBox(height: 4),
                        Text(
                          "Rezultat: ${entry.result.toStringAsFixed(2)}",
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                    trailing: IconButton(
                      icon: const Icon(Icons.delete, color: Colors.red),
                      onPressed: () => _deleteEntry(entry.id!),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}

// MODEL ZA POVIJEST KONVERZIJA
class ConversionHistory {
  final int? id;
  final DateTime date;
  final String operation;
  final String input;
  final double result;

  ConversionHistory({
    this.id,
    required this.date,
    required this.operation,
    required this.input,
    required this.result,
  });

  Map<String, dynamic> toMap() => {
        'id': id,
        'date': date.millisecondsSinceEpoch,
        'operation': operation,
        'input': input,
        'result': result,
      };

  factory ConversionHistory.fromMap(Map<String, dynamic> map) =>
      ConversionHistory(
        id: map['id'],
        date: DateTime.fromMillisecondsSinceEpoch(map['date']),
        operation: map['operation'],
        input: map['input'],
        result: map['result'],
      );
}

// POMOĆNA KLASA ZA BAZU PODATAKA (POVIJEST KONVERZIJA)
class ConversionDatabaseHelper {
  static final ConversionDatabaseHelper instance =
      ConversionDatabaseHelper._init();
  static Database? _database;

  ConversionDatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('conversion_history.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = p.join(dbPath, filePath);

    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE conversion_history(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date INTEGER NOT NULL,
            operation TEXT NOT NULL,
            input TEXT NOT NULL,
            result REAL NOT NULL
          )
        ''');
      },
    );
  }

  Future<int> insert(ConversionHistory history) async {
    final db = await database;
    return await db.insert('conversion_history', history.toMap());
  }

  Future<List<ConversionHistory>> getAll() async {
    final db = await database;
    final result = await db.query('conversion_history', orderBy: 'date DESC');
    return result.map((map) => ConversionHistory.fromMap(map)).toList();
  }

  Future<int> delete(int id) async {
    final db = await database;
    return await db
        .delete('conversion_history', where: 'id = ?', whereArgs: [id]);
  }

  Future close() async {
    final db = await database;
    db.close();
  }
}
