import '../../../../core/api/api_client.dart';
import '../models/producto.dart';

class CategoriaRepository {
  CategoriaRepository({ApiClient? api}) : _api = api ?? ApiClient.instance;

  final ApiClient _api;

  Future<List<Categoria>> listar() async {
    final data = await _api.guard<List<dynamic>>(
      () => _api.get('/categorias'),
    );
    return data
        .map((e) => Categoria.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<Categoria> crear({required String nombre, String? descripcion}) async {
    final data = await _api.guard<Map<String, dynamic>>(
      () => _api.post('/categorias', data: {
        'nombre': nombre,
        'descripcion': ?descripcion,
      }),
    );
    return Categoria.fromJson(data);
  }

  Future<void> eliminar(int id) async {
    await _api.guard<Map<String, dynamic>>(
      () => _api.delete('/categorias/$id'),
    );
  }
}
