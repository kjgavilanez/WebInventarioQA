import '../../../../core/api/api_client.dart';

class UsuarioItem {
  final int id;
  final String nombre;
  final String email;
  final String rol;
  const UsuarioItem({
    required this.id,
    required this.nombre,
    required this.email,
    required this.rol,
  });

  factory UsuarioItem.fromJson(Map<String, dynamic> json) => UsuarioItem(
        id: (json['id'] as num).toInt(),
        nombre: json['nombre'] as String,
        email: json['email'] as String,
        rol: json['rol'] as String,
      );
}

class UsuarioRepository {
  UsuarioRepository({ApiClient? api}) : _api = api ?? ApiClient.instance;

  final ApiClient _api;

  Future<List<UsuarioItem>> listar() async {
    final data = await _api.guard<List<dynamic>>(
      () => _api.get('/usuarios'),
    );
    return data
        .map((e) => UsuarioItem.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<void> eliminar(int id) async {
    await _api.guard<Map<String, dynamic>>(
      () => _api.delete('/usuarios/$id'),
    );
  }

  Future<UsuarioItem> cambiarRol(int id, String rol) async {
    final data = await _api.guard<Map<String, dynamic>>(
      () => _api.patch('/usuarios/$id/rol', data: {'rol': rol}),
    );
    return UsuarioItem.fromJson(data);
  }
}
